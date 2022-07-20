import * as express from 'express';
import { Controller } from './controller';

const router = express.Router();

router.get('/comps', Controller.GetComps);

export default router;
