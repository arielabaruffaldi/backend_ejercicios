import express from 'express';
import router from './routes/';
import path from 'path'
import * as http from "http";
const cors = require('cors');

const publicPath = path.resolve(__dirname, '../public');
const PORT = 8080;

const app: express.Application = express();
const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server up en puerto', PORT);
});

server.on('error', (error) => console.log(`Error en el servidor: ${error}`));


app.use(express.static(publicPath));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


//ROUTES
app.use('/', router)
