import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getConnection } from 'typeorm';
import logger from '../utils/logger';
import { Field } from '../entities/field';
import { paramMissingError } from '../utils/constants';

// Init shared
const router = Router();

/** ****************************************************************************
 *                      Get All Fields - "GET /api/v1/field"
 ***************************************************************************** */

router.get('/', async (req: Request, res: Response) => {
  try {
    const fields = await getConnection()
      .getRepository(Field)
      .createQueryBuilder('field')
      .getMany();
    return res.status(StatusCodes.OK).json({ fields });
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                      Get Field - "GET /api/v1/field/:id"
 ***************************************************************************** */

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const field = await getConnection()
      .createQueryBuilder()
      .select('field')
      .from(Field, 'field')
      .where('field.id = :id', { id })
      .getOne();
    if (!field) {
      res.status(404);
      res.end();
      return;
    }
    return res.status(StatusCodes.OK).json({ field });
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                       Add Field - "POST /api/v1/field"
 ***************************************************************************** */

router.post('/', async (req: Request, res: Response) => {
  try {
    logger.info('Entering add field data');
    const {
      field
    } = req.body;

    logger.info('Preparing add field data');

    if (!field) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Field)
      .values([
        {
          hidding: field.hidding,
          mandatory: field.mandatory,
          template: field.template,
          title: field.title,
          type: field.type,
          value: field.value
        }
      ])
      .execute();
    return res.status(StatusCodes.CREATED).end();
  } catch (e) {
    logger.error(e);
  }
});

/** ****************************************************************************
 *                       Update Field - "PUT api/v1/field/:id"
 ***************************************************************************** */

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { field } = req.body;
    const { id } = req.params;
    if (!field) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    await getConnection()
      .createQueryBuilder()
      .update(Field)
      .set({
        hidding: field.hidding,
        mandatory: field.mandatory,
        template: field.template,
        title: field.title,
        type: field.type,
        value: field.value
      })
      .where('id = :id', { id })
      .execute();
    return res.status(StatusCodes.OK).end();
  } catch (e) {
    logger.error(e);
  }
});

export default router;
