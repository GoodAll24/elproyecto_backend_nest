import { MigrationInterface, QueryRunner } from 'typeorm';
import { rolesConfig } from '@app/config/roles.config';

export class CreateRoleRegisters1766422253517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const { name, description } of rolesConfig)
      await queryRunner.query(
        `INSERT INTO "roles"
       ("id", "name", "description", "createdAt", "updatedAt")
       VALUES
       (DEFAULT, '${name}', '${description}', DEFAULT, DEFAULT)`,
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop * from table "roles"`);
  }
}
