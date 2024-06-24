import { Player } from '../../../domain/models/players/player'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Player' })
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, unique: true })
  name: string

  static readonly RELATIONS = {}

  static toPlayer(playerEntity: PlayerEntity): Player {
    return new Player({
      id: playerEntity.id,
      name: playerEntity.name
    })
  }
}

export type PlayerEntityToCreate = Omit<PlayerEntity, 'id'>
export type PlayerEntityToUpdate = Pick<PlayerEntity, 'name'>
