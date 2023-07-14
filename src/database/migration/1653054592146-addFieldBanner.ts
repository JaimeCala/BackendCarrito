import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldBanner1653054592146 implements MigrationInterface {
    name = 'addFieldBanner1653054592146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banners" ("idbanner" SERIAL NOT NULL, "nombreimgbanner" character varying(50) NOT NULL, "linkimgbanner" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b561fca99996ab2fd225b49012" PRIMARY KEY ("idbanner"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "banners"`);
    }

}
