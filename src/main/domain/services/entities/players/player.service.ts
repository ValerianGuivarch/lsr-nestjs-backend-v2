import { PLAYER_PORT } from '../../../../di-token'
import { Player, PlayerToCreate, PlayerToUpdate } from '../../../models/players/player'
import { PlayerPort } from '../../../ports/player.port'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class PlayerService {
  constructor(@Inject(PLAYER_PORT) private playerProvider: PlayerPort) {}

  async createPlayer(p: { playerToCreate: PlayerToCreate }): Promise<Player> {
    return await this.playerProvider.create({
      name: p.playerToCreate.name
    })
  }

  async getAll(): Promise<Player[]> {
    return await this.playerProvider.findAll()
  }

  async getPlayerById(playerId: string): Promise<Player> {
    return await this.playerProvider.findOneById(playerId)
  }

  async updatePlayer(p: { playerId: string; playerToUpdate: Partial<PlayerToUpdate> }): Promise<Player> {
    return await this.playerProvider.update(p.playerId, p.playerToUpdate)
  }

  async deleteOnePlayer(id: string): Promise<void> {
    await this.playerProvider.deleteOneById(id)
  }
}
