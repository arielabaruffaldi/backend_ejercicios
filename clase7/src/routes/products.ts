import express, { Request, Response } from 'express';
import Products from './../Products'
import path from 'path';

const PUBLIC_PATH = path.join(__dirname, '../', 'products.txt')

const router = express.Router()
const products = new Products(PUBLIC_PATH)


router.get('/', async (req: Request, res: Response) => {
    const data = await products.getAll()
    res.json(data)
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await products.getById(Number(id))
        res.json(data)
    } catch (error) {
        let msg = (error as Error).message;
        return res.status(400).json({error: msg});
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { title, price, thumbnail } = req.body
    if (title && price && thumbnail) {
        const request = await products.save({
            title,
            price,
            thumbnail
        })
        res.status(201).json(`se creó el producto con id: ${request}`)
    } else {
        res.status(400).json(`Debe ingresar un title, price y thumbnail`)
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const {
        params: { id },
        body: { title, price, thumbnail }
    } = req
    if (title || price || thumbnail) {
        const response = await products.updateProduct(Number(id), { title, price, thumbnail })
        res.json(response)
    } else {
        res.status(400).json(`Debe ingresar un title, price o thumbnail`)
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req
    try {
        const response = await products.deleteById(Number(id))
        res.json(response)
    } catch (error) {
        let msg = (error as Error).message;
        return res.status(400).json({error: msg});
    }

});

export default router