export class Player {
  id: string
  name: string

  constructor(player: Player) {
    this.id = player.id
    this.name = player.name
  }

  static toPlayerToCreate(p: { name: string }): PlayerToCreate {
    return {
      name: p.name
    }
  }

  static toPlayerToUpdate(p: { name: string }): PlayerToUpdate {
    return {
      name: p.name
    }
  }
}

export type PlayerToCreate = Omit<Player, 'id'>
export type PlayerToUpdate = Pick<Player, 'name'>
