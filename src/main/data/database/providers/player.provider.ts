import { Player, PlayerToCreate, PlayerToUpdate } from '../../../domain/models/players/player'
import { PlayerPort } from '../../../domain/ports/player.port'
import { ProviderErrors } from '../../errors/ProviderErrors'
import { PlayerEntity, PlayerEntityToCreate, PlayerEntityToUpdate } from '../entities/player.entity'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PlayerProvider implements PlayerPort {
  private readonly logger = new Logger(PlayerEntity.name)
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>
  ) {
    this.logger.log('Initialised')
  }

  async create(playerToCreate: PlayerToCreate): Promise<Player> {
    const toCreate: PlayerEntityToCreate = {
      name: playerToCreate.name
    }
    const created = this.playerRepository.create(toCreate)
    await this.playerRepository.insert(created)
    return this.findOneById(created.id)
  }

  async findAll(): Promise<Player[]> {
    const players = await this.playerRepository.find({
      where: {},
      relations: PlayerEntity.RELATIONS
    })
    return players.map((dbPlayer) => PlayerEntity.toPlayer(dbPlayer))
  }

  async findOneById(playerId: string): Promise<Player> {
    const dbPlayer = await this.playerRepository.findOne({
      where: {
        id: playerId
      },
      relations: PlayerEntity.RELATIONS
    })
    if (!dbPlayer) {
      throw ProviderErrors.EntityNotFound(PlayerProvider.name)
    }
    return PlayerEntity.toPlayer(dbPlayer)
  }

  async update(playerId: string, playerToUpdate: Partial<PlayerToUpdate>): Promise<Player> {
    const toUpdate: Partial<PlayerEntityToUpdate> = {
      name: playerToUpdate.name
    }
    await this.playerRepository.update(
      {
        id: playerId
      },
      toUpdate
    )
    return this.findOneById(playerId)
  }

  async deleteOneById(playerId: string): Promise<void> {
    const res = await this.playerRepository.delete({
      id: playerId
    })
    if (!res.affected) {
      throw ProviderErrors.EntityNotFound(PlayerEntity.name)
    }
  }
}
