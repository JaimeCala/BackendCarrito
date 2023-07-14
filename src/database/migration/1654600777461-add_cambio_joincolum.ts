import {MigrationInterface, QueryRunner} from "typeorm";

export class addCambioJoincolum1654600777461 implements MigrationInterface {
    name = 'addCambioJoincolum1654600777461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" DROP CONSTRAINT "FK_6f45adf94f3e181f0d52e0061c2"`);
        await queryRunner.query(`ALTER TABLE "reclamos" RENAME COLUMN "userIdusuario" TO "idusuario"`);
        await queryRunner.query(`ALTER TABLE "reclamos" ADD CONSTRAINT "FK_046903a9d9d7416997c17d84305" FOREIGN KEY ("idusuario") REFERENCES "users"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" DROP CONSTRAINT "FK_046903a9d9d7416997c17d84305"`);
        await queryRunner.query(`ALTER TABLE "reclamos" RENAME COLUMN "idusuario" TO "userIdusuario"`);
        await queryRunner.query(`ALTER TABLE "reclamos" ADD CONSTRAINT "FK_6f45adf94f3e181f0d52e0061c2" FOREIGN KEY ("userIdusuario") REFERENCES "users"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
