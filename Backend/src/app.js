import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';

const app = express();

import { mongoose } from './config/database.config';

app.set('port', config.PORT);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const api = config.API_URL;
app.get(`${api}`, (req,res)=>{
    res.send(
        `<h1>API ejecutandose en raiz</h1> <p> Catalogo de Productos(CdP): <b>${api}/api-docs</b> Para mas información.</p>`
    );
})

export default app;