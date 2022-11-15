import { MigrationInterface, QueryRunner } from "typeorm";

export class init1668541733427 implements MigrationInterface {
    name = 'init1668541733427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "description" text NOT NULL, "image" character varying NOT NULL, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
