import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreatePlayerRequestDto {
  @ApiProperty({ description: 'The name of the player', type: String })
  @IsString()
  name: string
}

export const CreatePlayerRequestExample = {
  characterId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  name: 'Bob'
}
