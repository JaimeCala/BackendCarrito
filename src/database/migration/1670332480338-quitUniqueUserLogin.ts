import {MigrationInterface, QueryRunner} from "typeorm";

export class quitUniqueUserLogin1670332480338 implements MigrationInterface {
    name = 'quitUniqueUserLogin1670332480338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "UQ_c9db456a9dca0e6e45d16669e9a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_eff3cf686729ac337fe991de64f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_eff3cf686729ac337fe991de64f" UNIQUE ("ci")`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "UQ_c9db456a9dca0e6e45d16669e9a" UNIQUE ("username")`);
    }

}
