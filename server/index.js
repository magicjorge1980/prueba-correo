import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

import 'dotenv/config'

const { API_BASE_URL } = process.env

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);
app.use(express.json());

app.use('/cards', express.static(path.join(__dirname, 'cards')));

let selectedCards = {}

app.get('/card-image', (req, res) => {
    const { email } = req.query;
    console.log('Query Params:', req.query);
    console.log('Email recibido:', email);

    if (!email) {
        return res.status(400).send('Email no proporcionado');
    }

    const card = selectedCards[email] || 'unknown';
    console.log('Card:', card);

    const imagePath = path.join(__dirname, 'cards', `${card}.avif`);
    console.log('Image Path:', imagePath);

    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error('Error al enviar la imagen:', err);
            res.status(404).send('Imagen no encontrada');
        }
    });
});


app.post('/select-card', (req, res) => {
    const { email, card } = req.body;
    console.log(email, card)

    selectedCards[email] = card;
    console.log(selectedCards)
    res.send({ message: 'Carta seleccionada actualizada con éxito' });
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
            <img src="${API_BASE_URL}/card-image?email=${email}&random=${Math.random()}" alt="Carta seleccionada">
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
