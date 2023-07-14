import {MigrationInterface, QueryRunner} from "typeorm";

export class addfilepdfpedido21668593052034 implements MigrationInterface {
    name = 'addfilepdfpedido21668593052034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" ADD "nombrefilepdf" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "linkfilepdf" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "linkfilepdf"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "nombrefilepdf"`);
    }

}
