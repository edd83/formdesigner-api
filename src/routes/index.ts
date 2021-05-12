import { Router } from 'express';
import TemplateRouter from './templates';
import FieldRouter from './fields';
import SectionRouter from './sections';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/template', TemplateRouter);
router.use('/field', FieldRouter);
router.use('/section', SectionRouter);

// Export the base-router
export default router;
