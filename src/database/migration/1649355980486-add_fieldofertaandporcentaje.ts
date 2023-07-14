import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldofertaandporcentaje1649355980486 implements MigrationInterface {
    name = 'addFieldofertaandporcentaje1649355980486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" ADD "oferta" character varying(3)`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "porcentaje" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "porcentaje"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "oferta"`);
    }

}
