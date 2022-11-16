import { MigrationInterface, QueryRunner } from "typeorm";

export class onetomanyProductsBrands1668611122292 implements MigrationInterface {
    name = 'onetomanyProductsBrands1668611122292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "price" TO "brandId"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "brandId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "brandId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "brandId" TO "price"`);
    }

}
