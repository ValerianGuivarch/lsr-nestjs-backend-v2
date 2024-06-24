import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class InitDb1719241324000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Account
    await queryRunner.createTable(
      new Table({
        name: 'Player',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables
    await queryRunner.dropTable('Player', true)
  }
}
