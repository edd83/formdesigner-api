/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class TemplateProjectInitialisation1620771381143 implements MigrationInterface {
  public name = 'TemplateProjectInitialisation1620771381143'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "hidding" boolean NOT NULL DEFAULT false, "templateId" integer, "parentId" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "template" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "field" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "value" text NOT NULL, "mandatory" boolean NOT NULL DEFAULT false, "hidding" boolean NOT NULL DEFAULT false, "templateId" integer, CONSTRAINT "PK_39379bba786d7a75226b358f81e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "field_sections_section" ("fieldId" integer NOT NULL, "sectionId" integer NOT NULL, CONSTRAINT "PK_5f410b88e7d80d6e3674723ffe9" PRIMARY KEY ("fieldId", "sectionId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_d30fa5453ed13a6e96e887250d" ON "field_sections_section" ("fieldId") `);
    await queryRunner.query(`CREATE INDEX "IDX_34092e7e23af2ee4f17d0652ad" ON "field_sections_section" ("sectionId") `);
    await queryRunner.query(`CREATE TABLE "section_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_67e7efbba1ad56ff0f35cd51e5a" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
    await queryRunner.query(`CREATE INDEX "IDX_6f7979cd403806620312cb6226" ON "section_closure" ("id_ancestor") `);
    await queryRunner.query(`CREATE INDEX "IDX_24cfcf2a69cd9f0e346fb57e4c" ON "section_closure" ("id_descendant") `);
    await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_ed683fcbc8a987ededbd9e29c97" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_9f961c619507c4d6276251445c8" FOREIGN KEY ("parentId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "field" ADD CONSTRAINT "FK_864236af65278da56ead790188c" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "field_sections_section" ADD CONSTRAINT "FK_d30fa5453ed13a6e96e887250dc" FOREIGN KEY ("fieldId") REFERENCES "field"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "field_sections_section" ADD CONSTRAINT "FK_34092e7e23af2ee4f17d0652ada" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "section_closure" ADD CONSTRAINT "FK_6f7979cd403806620312cb6226c" FOREIGN KEY ("id_ancestor") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "section_closure" ADD CONSTRAINT "FK_24cfcf2a69cd9f0e346fb57e4c2" FOREIGN KEY ("id_descendant") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "section_closure" DROP CONSTRAINT "FK_24cfcf2a69cd9f0e346fb57e4c2"`);
    await queryRunner.query(`ALTER TABLE "section_closure" DROP CONSTRAINT "FK_6f7979cd403806620312cb6226c"`);
    await queryRunner.query(`ALTER TABLE "field_sections_section" DROP CONSTRAINT "FK_34092e7e23af2ee4f17d0652ada"`);
    await queryRunner.query(`ALTER TABLE "field_sections_section" DROP CONSTRAINT "FK_d30fa5453ed13a6e96e887250dc"`);
    await queryRunner.query(`ALTER TABLE "field" DROP CONSTRAINT "FK_864236af65278da56ead790188c"`);
    await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_9f961c619507c4d6276251445c8"`);
    await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_ed683fcbc8a987ededbd9e29c97"`);
    await queryRunner.query(`DROP INDEX "IDX_24cfcf2a69cd9f0e346fb57e4c"`);
    await queryRunner.query(`DROP INDEX "IDX_6f7979cd403806620312cb6226"`);
    await queryRunner.query(`DROP TABLE "section_closure"`);
    await queryRunner.query(`DROP INDEX "IDX_34092e7e23af2ee4f17d0652ad"`);
    await queryRunner.query(`DROP INDEX "IDX_d30fa5453ed13a6e96e887250d"`);
    await queryRunner.query(`DROP TABLE "field_sections_section"`);
    await queryRunner.query(`DROP TABLE "field"`);
    await queryRunner.query(`DROP TABLE "template"`);
    await queryRunner.query(`DROP TABLE "section"`);
  }
}
