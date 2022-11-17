import { MigrationInterface, QueryRunner } from "typeorm";

export class addprice1668718571101 implements MigrationInterface {
    name = 'addprice1668718571101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    }

}
