import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuth1766282958527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table "loginData" (
            "id" uuid not null default uuid_generate_v4(),
            "userId" uuid,
            "deviceInfo" jsonb,
            "ip" character varying not null,
            "email" character varying not null,
            "success" boolean not null default false,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            constraint "PK8749878979243" primary key("id"),
            foreign key("userId") references "users"("id") on delete set null
        )
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            drop table if exists "loginData"
            `);
  }
}
