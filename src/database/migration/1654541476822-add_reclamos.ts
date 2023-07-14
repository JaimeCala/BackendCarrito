import {MigrationInterface, QueryRunner} from "typeorm";

export class addReclamos1654541476822 implements MigrationInterface {
    name = 'addReclamos1654541476822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reclamos" ("idreclamo" SERIAL NOT NULL, "comentario" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userIdusuario" integer, CONSTRAINT "PK_6457b71912c47d565d51803e69e" PRIMARY KEY ("idreclamo"))`);
        await queryRunner.query(`ALTER TABLE "pedidoproducto" ADD "oferta" character varying`);
        await queryRunner.query(`ALTER TABLE "pedidoproducto" ADD "porcentaje_des" double precision`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "estado" character varying(10) DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "reclamos" ADD CONSTRAINT "FK_6f45adf94f3e181f0d52e0061c2" FOREIGN KEY ("userIdusuario") REFERENCES "users"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" DROP CONSTRAINT "FK_6f45adf94f3e181f0d52e0061c2"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "pedidoproducto" DROP COLUMN "porcentaje_des"`);
        await queryRunner.query(`ALTER TABLE "pedidoproducto" DROP COLUMN "oferta"`);
        await queryRunner.query(`DROP TABLE "reclamos"`);
    }

}
