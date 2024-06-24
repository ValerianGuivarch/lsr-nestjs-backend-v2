import { Player, PlayerToCreate, PlayerToUpdate } from '../models/players/player'

export interface PlayerPort {
  create(player: PlayerToCreate): Promise<Player>
  findAll(): Promise<Player[]>
  findOneById(playerId: string): Promise<Player>
  update(playerId: string, playerToUpdate: Partial<PlayerToUpdate>): Promise<Player>
  deleteOneById(playerId: string): Promise<void>
}
