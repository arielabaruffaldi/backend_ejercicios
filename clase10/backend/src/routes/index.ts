import express from 'express';
import productRouter from './products';

import { isAdmin } from './../middlewares/isAdmin';

const router = express.Router()

router.use('/products', productRouter);

export default router;