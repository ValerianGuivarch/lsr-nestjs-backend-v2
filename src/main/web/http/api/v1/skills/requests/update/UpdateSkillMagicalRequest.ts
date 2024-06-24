import { UpdateSkillRequest } from './UpdateSkillRequest'
import { MagicElement } from '../../../../../../../domain/models/skills/MagicElement'
import {
  SKILL_MAGICAL_SPELL_LEVEL_MAX,
  SKILL_MAGICAL_SPELL_LEVEL_MIN
} from '../../../../../../../domain/models/skills/SkillMagical'
import { SkillType } from '../../../../../../../domain/models/skills/SkillType'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, Max, Min } from 'class-validator'

export class UpdateSkillMagicalRequest extends UpdateSkillRequest {
  @ApiProperty({
    description: 'The skill spell level',
    type: 'number',
    minimum: SKILL_MAGICAL_SPELL_LEVEL_MIN,
    maximum: SKILL_MAGICAL_SPELL_LEVEL_MAX
  })
  @IsNumber()
  @Min(SKILL_MAGICAL_SPELL_LEVEL_MIN)
  @Max(SKILL_MAGICAL_SPELL_LEVEL_MAX)
  spellLevel: number

  @ApiProperty({
    description: 'The magical skill element',
    examples: Object.values(MagicElement),
    enumName: 'MagicElement',
    enum: MagicElement
  })
  @IsEnum(MagicElement)
  element: MagicElement

  static isSkillMagicalRequest(request: UpdateSkillRequest): request is UpdateSkillMagicalRequest {
    return request.type === SkillType.MAGICAL
  }
}

export const UpdateSkillMagicalRequestExample = {
  name: 'fireball',
  description: 'Burn everything in a radius',
  damage: 50,
  minimumLevel: 4,
  type: SkillType.MAGICAL,
  spellLevel: 3,
  element: MagicElement.FIRE
}