import express from 'express';
import productRouter from './products';
import messageRouter from './messages';
import cartRouter from './cart';


const router = express.Router()

router.use('/api/productos', productRouter);
router.use('/api/messages', messageRouter);
router.use('/api/carrito', cartRouter);
router.use(function (req, res, next) {
    return res.status(404).json({ error: -2, descripcion: 'Ruta no encontrada' });

})
export default router;