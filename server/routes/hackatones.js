import { Router } from 'express';
import { query } from '../bd.js'; // Asegúrate que bd.js exporta query correctamente

const router = Router();


router.get('/', async (req, res) => {

    res.json({ message: 'Hackaton' });
});

router.get('/all', async (req, res) => {
    try {
        const result = await query('SELECT * FROM hackathons');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

export default router;