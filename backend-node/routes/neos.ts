import express from 'express';

import { readAll } from '../controller/neo';

const router = express.Router();

router.get('/', readAll);

export default router;
