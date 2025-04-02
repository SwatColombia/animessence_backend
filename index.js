import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import animadorRoutes from './routes/animadorRoutes.js';
import conectarDB from './database/db.js';

dotenv.config();

conectarDB();

const dominiosPermitidos = ['https://animessence-frontend-uiaj.vercel.app', 'http://localhost:5173'];

const app = express();
app.use(cors({
    origin: dominiosPermitidos,
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
    
}));
app.use(express.json());
const port = process.env.PORT || 4000;


app.use('/api/animadores3D', animadorRoutes)


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`

    );
    app.post('/data', (req, res) => {
        res.send('Datos recibidos');

    });
});