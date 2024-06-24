import config from './config/configuration'
import { PostgresModule } from './data/database/postgres.module'
import { PlayerService } from './domain/services/entities/players/player.service'
import { PlayerController } from './web/http/api/v1/items/player.controller'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    PostgresModule
  ],
  controllers: [PlayerController],
  providers: [PlayerService]
})
export class AppModule {}
