import express from 'express';
import productRouter from './products';
import messageRouter from './messages';
import cartRouter from './cart';

import { isAdmin } from './../middlewares/isAdmin';

const router = express.Router()

router.use('/products', productRouter);
router.use('/messages', messageRouter);
router.use('/cart', cartRouter);

export default router;