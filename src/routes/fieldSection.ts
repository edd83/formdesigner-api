import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getConnection } from 'typeorm';
import { Configuration } from '../config/config';

// Init shared
const router = Router();

/** ****************************************************************************
 *                    Delete - "DELETE /api/v1/fieldSection/:id"
 ***************************************************************************** */

if (Configuration.IS_TEST) {
  router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('field_sections_section')
      .where('sectionId = :id', { id })
      .execute();
    return res.status(StatusCodes.OK).end();
  });
}

export default router;
