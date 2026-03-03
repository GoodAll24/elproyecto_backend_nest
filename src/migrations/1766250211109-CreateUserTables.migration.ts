import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTables1766250211109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(
      `create table "users" (
        "id" uuid not null default uuid_generate_v4(),
        "username" character varying(60) not null,
        "firstName" character varying(100) not null,
        "lastName" character varying(100) not null,
        "email" character varying(200) not null,
        "password" character varying(255) not null,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        constraint "UQ_email_users" unique("email"),
        constraint "UQ_username_users" unique("username"),
        constraint "PK748927313121348234" primary key("id")
    )`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`drop table "users"`);
  }
}
