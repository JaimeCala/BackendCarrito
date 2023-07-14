import {MigrationInterface, QueryRunner} from "typeorm";

export class ponercamposnull1668632199375 implements MigrationInterface {
    name = 'ponercamposnull1668632199375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra" ALTER COLUMN "tipo_comprobante" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra" ALTER COLUMN "num_comprobante" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "maximo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "maximo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra" ALTER COLUMN "num_comprobante" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra" ALTER COLUMN "tipo_comprobante" SET NOT NULL`);
    }

}
