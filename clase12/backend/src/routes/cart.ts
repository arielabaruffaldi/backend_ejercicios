import express, { Request, Response } from 'express';

const router = express.Router()

router.get('/listar', (req: Request, res: Response) => {
  res.json({res: "hola desde cart"})
});


export default router;