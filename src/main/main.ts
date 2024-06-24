import { AppModule } from './app.module'
import config from './config/configuration'
import { MigrationsProvider } from './data/database/migrations/MigrationsProvider'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true
  })

  const migrationRunner = app.get(MigrationsProvider)
  try {
    await migrationRunner.runMigrations()
    console.log('Migrations completed successfully.')
  } catch (error) {
    console.error('Migrations failed:', error)
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))

  const configuration = new DocumentBuilder()
    .setTitle('Starter swagger')
    .setDescription('The Starter API swagger')
    .setVersion('1.0')
    .addTag('Starter')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, configuration)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha'
    }
  })

  /*const agent = createAgent({
    authSecret: configService.get('FOREST_AUTH_SECRET'),
    envSecret: configService.get('FOREST_ENV_SECRET'),
    isProduction: configService.get('NODE_ENV') === 'production',
    typingsPath: './typings.ts',
    typingsMaxDepth: 5
  })
    // Create your SQL datasource
    .addDataSource(createSqlDataSource(configService.get('DB_URI')))
  await agent.mountOnNestJs(app).start()*/

  app.enableCors({
    origin: [config().cors.forestAdmin],
    credentials: true
  })

  await app.listen(config().http.port, config().http.host)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap().then(() => console.log('Application started'))
