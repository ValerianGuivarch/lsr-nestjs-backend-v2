import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdatePlayerRequestDto {
  @ApiProperty({ description: 'The name of the player', type: String })
  @IsString()
  name: string
}

export const UpdatePlayerRequestExample = {
  characterId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  name: 'Bob'
}
