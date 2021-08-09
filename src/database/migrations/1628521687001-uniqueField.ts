import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueField1628521687001 implements MigrationInterface {
    name = 'uniqueField1628521687001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."post" ADD CONSTRAINT "UQ_e28aa0c4114146bfb1567bfa9ac" UNIQUE ("title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."post" DROP CONSTRAINT "UQ_e28aa0c4114146bfb1567bfa9ac"`);
    }

}
