import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getConnection } from 'typeorm';
import { Schemas } from '../validation/schemas';
import { Configuration } from '../config/config';
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

    const schema = Schemas.TemplateDetails.validate(template);
    if (schema.error && schema.error.details) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: schema.error.details[0].message
      });
    }

    const result = await getConnection()
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
    return res.status(StatusCodes.CREATED).json(result.raw[0]).end();
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

    const schema = Schemas.TemplateDetails.validate(template);
    if (schema.error && schema.error.details) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: schema.error.details[0].message
      });
    }

    await getConnection()
      .createQueryBuilder()
      .update(Template)
      .set({
        fields: template.fields ? template.fields : null,
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

/** ****************************************************************************
 *                    Delete - "DELETE /api/v1/template/:id"
 ***************************************************************************** */

if (Configuration.IS_TEST) {
  router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Template)
      .where('id = :id', { id })
      .execute();
    return res.status(StatusCodes.OK).end();
  });
}

export default router;
