import express, { Request, Response, NextFunction } from 'express';
import {messages} from '../controllers/Messages';

const router = express.Router()


router.post('/new', (req, res) => {
    const body = req.body;
    if (!body.email || !body.message) {
        return res.status(400).json({
            error: 'Deben ingresar mail y mensaje'
        })
    }
    messages.addMessage(body)
    return res.json(
        body
    );
})

router.get(
    '/get',
    async (req, res, next) => {
        try{
            const response = await messages.getMessages()
            res.json(response)
            next()
        }
        catch(err){
            res.status(400).json({
                error: 'Ocurrió un error al obtener los mensajes'
            })
        }
        
    })


export default router;