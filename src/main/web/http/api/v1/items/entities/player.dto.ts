import { Player } from '../../../../../../domain/models/players/player'
import { ApiProperty } from '@nestjs/swagger'

export class PlayerDto {
  @ApiProperty({ description: 'The player id', type: String, format: 'uuid' })
  id: string

  @ApiProperty({ description: 'The player name', type: String })
  name: string

  constructor(player: PlayerDto) {
    this.id = player.id
    this.name = player.name
  }

  static from(player: Player): PlayerDto {
    return new PlayerDto({
      id: player.id,
      name: player.name
    })
  }
}

export const PlayerDtoExample: PlayerDto = {
  id: '09691b8d-5cc1-4966-b614-d0f04f6422fd',
  name: 'Bob'
}
