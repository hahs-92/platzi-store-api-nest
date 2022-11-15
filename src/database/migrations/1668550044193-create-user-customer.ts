import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserCustomer1668550044193 implements MigrationInterface {
    name = 'createUserCustomer1668550044193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_c6c520dfb9a4d6dd749e73b13de" UNIQUE ("customerId")`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_c6c520dfb9a4d6dd749e73b13de"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createAt"`);
    }

}
