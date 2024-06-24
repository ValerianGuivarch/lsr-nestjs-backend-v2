import { PlayerEntity } from './entities/player.entity'
import { InitDb1719241324000 } from './migrations/1719241324000-init-db'
import { MigrationsProvider } from './migrations/MigrationsProvider'
import { PlayerProvider } from './providers/player.provider'
import config from '../../config/configuration'
import { PLAYER_PORT } from '../../di-token'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        name: 'postgres',
        type: 'postgres',
        host: config().postgres.host,
        port: config().postgres.port,
        username: config().postgres.username,
        password: config().postgres.password,
        database: config().postgres.database,
        autoLoadEntities: config().postgres.autoLoadEntities,
        synchronize: false,
        entities: [PlayerEntity],
        migrations: [InitDb1719241324000]
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    MigrationsProvider,
    {
      provide: PLAYER_PORT,
      useClass: PlayerProvider
    }
  ],
  exports: [
    TypeOrmModule,
    {
      provide: PLAYER_PORT,
      useClass: PlayerProvider
    }
  ]
})
export class PostgresModule {}
