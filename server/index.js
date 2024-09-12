import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import mongoose from 'mongoose';
import Card from './models/Card.js'

import 'dotenv/config'

const { API_BASE_URL } = process.env
const { MONGODB_URL } = process.env

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();


mongoose.connect(MONGODB_URL)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);
app.use(express.json());

app.use('/cards', express.static(path.join(__dirname, 'cards')));

let selectedCards = {}

app.get('/card-image', async (req, res) => {
    const { email } = req.query;
    console.log('Query Params:', req.query);
    console.log('Email recibido:', email);

    if (!email) {
        return res.status(400).send('Email no proporcionado');
    }

    try {
        // Buscar la carta en la base de datos
        const userCard = await Card.findOne({ email });
        const card = userCard ? userCard.card : 'unknown';
        console.log('Card:', card);

        const imagePath = path.join(__dirname, 'cards', `${card}.avif`);
        console.log('Image Path:', imagePath);

        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error('Error al enviar la imagen:', err);
                res.status(404).send('Imagen no encontrada');
            }
        });
    } catch (error) {
        console.error('Error al obtener la carta:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.post('/select-card', async (req, res) => {
    const { email, card } = req.body;
    console.log(email, card);

    try {
        // Busca si el email ya existe y actualiza o crea uno nuevo
        const existingCard = await Card.findOneAndUpdate(
            { email },
            { card },
            { new: true, upsert: true } // upsert: true crea un documento si no existe
        );

        res.send({ message: 'Carta seleccionada actualizada con éxito', card: existingCard });
    } catch (error) {
        console.error('Error al seleccionar la carta:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.post('/envio-mail', async (req, res) => {
    try {
        const resend = new Resend('re_PTxCcish_HwrkxSnThhErniYMmKcjSpeA');
        const { email } = req.body;

        const response = await resend.emails.send({
            from: 'info@jorgemoreno.es',
            to: [email],
            subject: 'Futuro',
            html: `
            <p>¡Aquí está la carta seleccionada!</p>
            <img src="${API_BASE_URL}card-image?email=${email}&random=${Math.random()}" alt="Carta seleccionada">
            `,
        });

        if (response.error) {
            console.error(response.error);
            return res.status(500).json({ error: 'Error al enviar el email' });
        }

        console.log(response);
        res.status(200).json({ message: 'Email enviado con éxito', data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
