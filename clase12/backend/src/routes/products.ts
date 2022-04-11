import express, { Request, Response } from 'express';
import Products from "../services/Products";

const router = express.Router()
const products = new Products([])

router.get('/listar', (req: Request, res: Response) => {
    const response = products.getProducts()

    res.json(response)
});

router.get('/listar/:id', (req: Request, res: Response) => {
    const { id } = req.params
    const product = products.getProductById(Number(id));
    if (!product) {
        return res.status(400).json({
            error: 'no existe el id ' + id
        })
    }
    res.json(product)
});

router.post('/guardar', (req: Request, res: Response) => {
    const { body } = req;
    if (!body.name || !body.price) {
        return res.status(400).json({
            error: 'Deben ingresar name y price'
        })
    }
    products.addProduct(body)
    return res.json(
        products
    );
});

router.put('/update/:id', (req: Request, res: Response) => {
    const body = req.body;
    const { id } = req.params;
    const product = products.getProductById(Number(id))
    if (!product || !body.name) {
        return res.status(400).json({
            error: `no existe el id ${id}`
        })
    }
    products.updateProduct(Number(id), body)
    return res.json(product)
});

router.delete('/delete/:id', (req: Request, res: Response) => {
    const { id } = req.params
    const product = products.getProductById(Number(id))
    if (!product) {
        return res.status(400).json({
            error: `no existe el id ${id}`
        })
    }
    products.deleteProduct(Number(id))
    return res.json(products)
});

export default router;