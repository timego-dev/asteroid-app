import express from 'express';

import { read, readAll } from '../controller/neo';

const router = express.Router();

router.get('/', readAll);
router.get('/:id', read);

export default router;
