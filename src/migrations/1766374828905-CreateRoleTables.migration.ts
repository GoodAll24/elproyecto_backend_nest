import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingRoleTables1766374828905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create type "public"."roleType" as enum('regular', 'professional', 'admin')`,
    );
    await queryRunner.query(
      `create type "public"."userRoleType" as enum('client', 'professional', 'admin')`,
    );
    await queryRunner.query(
      `create table "roles" (
                "id" uuid not null default uuid_generate_v4(),
                "name" "public"."userRoleType" not null,
                "description" character varying not null,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                constraint "UQ_name_roles" unique("name"),
                constraint "PK748927763476287462" primary key("id")
            )`,
    );
    await queryRunner.query(
      `create index "IDX_239136ijjsfjl34789ae2daf" on "roles" ("name") `,
    );
    await queryRunner.query(
      `alter table "users"
                add column "roleId" uuid not null`,
    );
    await queryRunner.query(
      `alter table "users"
                add foreign key("roleId") references "roles"("id")`,
    );
    //         await queryRunner.query(`
    //     create table "roleUsers" (
    //         "id" uuid not null default uuid_generate_v4(),
    //         "userId" uuid not null,
    //         "roleId" uuid not null,
    //         foreign key("userId") references "users"("id") on delete cascade,
    //         foreign key("roleId") references "roles"("id") on delete set null,
    //         constraint "PK74892749827498234" primary key("id")
    //     )
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            drop table "roles"
    `);
    //     await queryRunner.query(`
    //             drop table "roleUsers"
    //     `);
  }
}
