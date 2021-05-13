import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getConnection } from 'typeorm';
import { getFieldsSectionId, getSectionChildren } from '../utils/functions';
import { Section } from '../entities/section';
import { paramMissingError } from '../utils/constants';
import logger from '../utils/logger';
import { Configuration } from '../config/config';
import { Schemas } from '../validation/schemas';

// Init shared
const router = Router();

/** ****************************************************************************
 *                      Get All Sections - "GET /api/v1/section"
 ***************************************************************************** */

router.get('/', async (req: Request, res: Response) => {
  try {
    const originalSections = await getConnection()
      .getRepository(Section)
      .createQueryBuilder('section')
      .getMany();
    logger.info(originalSections);
    const sections = originalSections.map(async (sct) => {
      logger.info(JSON.stringify(sct));
      const newSection = sct;
      newSection.children = [await getSectionChildren(newSection)];
      newSection.fields = await getFieldsSectionId(newSection.id);
      return newSection;
    });
    return res.status(StatusCodes.OK).json({ sections });
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                      Get Section - "GET /api/v1/section/:id"
 ***************************************************************************** */

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const section = await getConnection()
      .createQueryBuilder()
      .select('section')
      .from(Section, 'section')
      .where('section.id = :id', { id })
      .getOne();
    if (!section) {
      res.status(404);
      res.end();
      return;
    }
    section.fields = await getFieldsSectionId(parseInt(id, 10));
    logger.info(section.fields);
    return res.status(StatusCodes.OK).json({ section });
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                       Add Section - "POST /api/v1/section"
 ***************************************************************************** */

router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      section
    } = req.body;

    const schema = Schemas.TemplateDetails.validate(section);
    if (schema.error && schema.error.details) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: schema.error.details[0].message
      });
    }

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Section)
      .values([
        {
          hidding: section.hidding,
          parent: section.parentId,
          template: section.template,
          title: section.title
        }
      ])
      .execute();
    if (section.fields) {
      const values = section.fields.map((field: number) => ({ fieldId: field, sectionId: result.identifiers[0].id }));
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('field_sections_section')
        .values(values)
        .execute();
    }
    // if (section.parentId) {
    //   await getConnection()
    //     .createQueryBuilder()
    //     .insert()
    //     .into('section_closure')
    //     .values([
    //       {
    //         id_ancestor: section.parentId,
    //         id_descendant: result.identifiers[0].id
    //       }
    //     ])
    //     .execute();
    // }
    return res.status(StatusCodes.CREATED).json(result.raw[0]).end();
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                       Update Section - "PUT api/v1/section/:id"
 ***************************************************************************** */

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { section } = req.body;
    const { id } = req.params;

    const schema = Schemas.TemplateDetails.validate(section);
    if (schema.error && schema.error.details) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: schema.error.details[0].message
      });
    }

    await getConnection()
      .createQueryBuilder()
      .update(Section)
      .set({
        hidding: section.hidding,
        parent: section.parentId,
        template: section.template,
        title: section.title
      })
      .where('id = :id', { id })
      .execute();
    if (section.fields) {
      const values = section.fields.map((field: number) => ({ fieldId: field, sectionId: id }));
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('field_sections_section')
        .values(values)
        .onConflict(`("fieldId", "sectionId") DO NOTHING`)
        .execute();
    }
    logger.info(section.parentId);
    logger.info(id);
    // if (section.parentId) {
    //   await getConnection()
    //     .createQueryBuilder()
    //     .insert()
    //     .into('section_closure')
    //     .values([
    //       {
    //         id_ancestor: section.parentId,
    //         id_descendant: id
    //       }
    //     ])
    //     .onConflict(`("id_ancestor", "id_descendant") DO NOTHING`)
    //     .execute();
    // }
    return res.status(StatusCodes.OK).end();
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                    Delete - "DELETE /api/v1/section/:id"
 ***************************************************************************** */

if (Configuration.IS_TEST) {
  router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Section)
      .where('id = :id', { id })
      .execute();
    return res.status(StatusCodes.OK).end();
  });
}

export default router;
