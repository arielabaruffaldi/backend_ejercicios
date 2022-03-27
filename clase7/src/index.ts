import express from 'express';
import path from 'path'
import productsRouter from './routes/products';

const PUBLIC_PATH = path.resolve(__dirname, '../public')
const PORT = 8080;

const app: express.Application = express();

const server = app.listen(PORT, () => {
    console.log('server up en puerto', PORT)
})

server.on('error', (err) => {
    console.log('ERROR =>', err);
});

server.on('error', (err) => {
    console.log('ERROR =>', err);
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(PUBLIC_PATH))

app.use('/api/productos', productsRouter)