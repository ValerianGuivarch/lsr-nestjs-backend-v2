import { PlayerDto, PlayerDtoExample } from './entities/player.dto'
import { CreatePlayerRequestDto, CreatePlayerRequestExample } from './requests/create-player-request.dto'
import { UpdatePlayerRequestDto } from './requests/update-player-request.dto'
import { Player } from '../../../../../domain/models/players/player'
import { PlayerService } from '../../../../../domain/services/entities/players/player.service'
import {
  generatePageResponseContent,
  generateRequestSchemasAndExamples,
  generateResponseContent
} from '../../utils/swagger'
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@Controller('api/v1/players')
@ApiTags('Players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @ApiOkResponse({
    description: 'Create a new player',
    content: generateResponseContent<PlayerDto>({
      types: PlayerDto,
      examples: {
        Example: PlayerDtoExample
      }
    })
  })
  @ApiBody({
    description: 'Create a new player',
    required: true,
    ...generateRequestSchemasAndExamples<CreatePlayerRequestDto>({
      types: CreatePlayerRequestDto,
      examples: {
        Example: CreatePlayerRequestExample
      }
    })
  })
  @HttpCode(HttpStatus.OK)
  @Post('')
  async createPlayer(@Body() request: CreatePlayerRequestDto): Promise<PlayerDto> {
    const player = await this.playerService.createPlayer({
      playerToCreate: Player.toPlayerToCreate({
        name: request.name
      })
    })
    return PlayerDto.from(player)
  }

  @ApiOkResponse({
    description: 'Get a specific player',
    content: generateResponseContent<PlayerDto>({
      types: PlayerDto,
      examples: {
        Example: PlayerDtoExample
      }
    })
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<PlayerDto> {
    const player = await this.playerService.getPlayerById(id)
    return PlayerDto.from(player)
  }

  @ApiOkResponse({
    description: 'Get all players',
    content: generatePageResponseContent({
      types: PlayerDto,
      examples: {
        Example: PlayerDtoExample
      }
    })
  })
  @HttpCode(HttpStatus.OK)
  @Get('')
  async findAllPlayers(): Promise<PlayerDto[]> {
    const players = await this.playerService.getAll()
    return players.map(PlayerDto.from)
  }

  @ApiOkResponse({
    description: 'Update an player',
    content: generateResponseContent<PlayerDto>({
      types: PlayerDto,
      examples: {
        Example: PlayerDtoExample
      }
    })
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updatePlayer(@Param('id') id: string, @Body() request: UpdatePlayerRequestDto): Promise<Player> {
    const player = await this.playerService.updatePlayer({
      playerId: id,
      playerToUpdate: {
        name: request.name
      }
    })
    return PlayerDto.from(player)
  }

  @ApiOkResponse({
    description: 'Delete an player of a character'
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':playerId')
  async deletePlayer(@Param('playerId') playerId: string): Promise<void> {
    await this.playerService.deleteOnePlayer(playerId)
  }
}
