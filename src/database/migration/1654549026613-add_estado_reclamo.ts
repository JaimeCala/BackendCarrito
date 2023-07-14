import {MigrationInterface, QueryRunner} from "typeorm";

export class addEstadoReclamo1654549026613 implements MigrationInterface {
    name = 'addEstadoReclamo1654549026613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" ADD "estado" character varying(10) DEFAULT 'ACTIVO'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" DROP COLUMN "estado"`);
    }

}
