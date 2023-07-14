import {MigrationInterface, QueryRunner} from "typeorm";

export class resetPassword1687805630561 implements MigrationInterface {
    name = 'resetPassword1687805630561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" ADD "reset_password_token" uuid`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "UQ_ccfccb4f5568d52259432893217" UNIQUE ("reset_password_token")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "UQ_ccfccb4f5568d52259432893217"`);
        await queryRunner.query(`ALTER TABLE "login" DROP COLUMN "reset_password_token"`);
    }

}
