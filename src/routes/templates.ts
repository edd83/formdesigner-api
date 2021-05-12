import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getConnection } from 'typeorm';
// import { getSectionsComponent, getFieldsComponent } from '../utils/functions';
import { Template } from '../entities/template';
import { paramMissingError } from '../utils/constants';
import logger from '../utils/logger';

// Init shared
const router = Router();

/** ****************************************************************************
 *                      Get All Templates - "GET /api/v1/template"
 ***************************************************************************** */

router.get('/', async (req: Request, res: Response) => {
  try {
    const templates = await getConnection()
      .getRepository(Template)
      .createQueryBuilder('template')
      .getMany();
    return res.status(StatusCodes.OK).json({ templates });
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                      Get Template - "GET /api/v1/template/:id"
 ***************************************************************************** */

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = await getConnection()
      .createQueryBuilder()
      .select('template')
      .from(Template, 'template')
      .where('template.id = :id', { id })
      .getOne();
    if (!template) {
      res.status(404);
      res.end();
      return;
    }
    return res.status(StatusCodes.OK).json({ template });
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                       Add Template - "POST /api/v1/template"
 ***************************************************************************** */

router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      template
    } = req.body;
    // let sections, fields;

    if (!template) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    // if (template.sections) {
    //   sections = await getSectionsComponent(template.sections);
    // }
    // if (template.fields) {
    //   fields = await getFieldsComponent(template.fields);
    //   logger.info(JSON.stringify(fields));
    // }
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Template)
      .values([
        {
          fields: template.fields,
          sections: template.sections,
          title: template.title
        }
      ])
      .execute();
    return res.status(StatusCodes.CREATED).end();
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                       Update Template - "PUT api/v1/template/:id"
 ***************************************************************************** */

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { template } = req.body;
    const { id } = req.params;
    if (!template) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    // const sections = await getSectionsComponent(template.sections);
    // const fields = await getFieldsComponent(template.fields);
    await getConnection()
      .createQueryBuilder()
      .update(Template)
      .set({
        fields: template.fields,
        sections: template.sections,
        title: template.title
      })
      .where('id = :id', { id })
      .execute();
    return res.status(StatusCodes.OK).end();
  } catch (e) {
    logger.error(e);
  }
});

export default router;
