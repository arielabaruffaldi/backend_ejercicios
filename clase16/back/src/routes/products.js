import express, { Request, Response } from 'express';
import {products} from '../controllers/Products'
import { isAdmin } from './../middlewares/isAdmin';

const router = express.Router()

router.get('/:id?', async (req, res) => {
    const { id } = req.params
    if (id) {
        try {
            const data = await products.getById(Number(id))
            res.json(data)
        } catch (error) {
            let msg = (error).message;
            return res.status(400).json({ error: msg });
        }
    } else {
        const data = await products.getAll()
        res.json(data)
    }
});

router.post('/', isAdmin, async (req, res) => {
    const { name, price, thumbnail, code, description, stock } = req.body
    if (name && price && thumbnail && code && description && stock) {
        const request = await products.save({
            name,
            price,
            thumbnail,
            code,
            description,
            stock
        })
        res.status(201).json(`se creó el producto con id: ${request}`)
    } else {
        res.status(400).json(`Debe ingresar name && price && thumbnail && code && description && stock`)
    }
});

router.put('/:id', isAdmin, async (req, res) => {
    const {
        params: { id },
        body
    } = req
    if (body.name || body.price || body.thumbnail || body.code || body.description || body.stock) {
        const response = await products.updateProduct(
            Number(id), body
        )
        res.json(response)
    } else {
        res.status(400).json(`Debe ingresar un title, price, thumbnail, code, description o stock`)
    }
});

router.delete('/:id', isAdmin, async (req, res) => {
    const {
        params: { id }
    } = req
    try {
        const response = await products.deleteById(Number(id))
        res.json(response)
    } catch (error) {
        let msg = (error).message;
        return res.status(400).json({ error: msg });
    }

});

export default router