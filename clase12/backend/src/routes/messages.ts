import express, { Request, Response, NextFunction } from 'express';
import Messages from "../services/Messages";

const router = express.Router()
const messages = new Messages()

router.post('/new', (req: Request, res: Response) => {
    const body = req.body;
    console.log("entro aca", body)
    if (!body.email || !body.message) {
        return res.status(400).json({
            error: 'Deben ingresar mail y mensaje'
        })
    }
    messages.addMessage(body)
    return res.json(
        messages
    );
})

router.get(
    '/get',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const response = await messages.getMessages()
            console.log("response---", response)
            res.json(response)
            next()
        }
        catch(err){
            console.log("error1", err)
        }
        
    })


export default router;