import { Router } from 'express';
import { query } from '../bd.js'; // Asegúrate que bd.js exporta correctamente la función query

const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await query('SELECT * FROM users');
        res.json(result.rows); // solo enviamos las filas
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la base de datos: ' + error.message });
    }
});

router.post('/', async (req, res) => {
    const { userId, name, email, created_at } = req.body;

    try {
        if (!userId || !name || !email || !created_at) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        // Verificar si ya existe el usuario
        const existingUser = await query('SELECT id FROM users WHERE id = $1', [userId]);

        if (existingUser.rows.length > 0) {
            return res.status(200).json({ message: 'El usuario ya existe. No se realizó ninguna acción.' });
        }

        // Insertar solo si no existe
        await query(
            'INSERT INTO users (id, name, email, created_at) VALUES ($1, $2, $3, $4)',
            [userId, name, email, created_at]
        );

        res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear usuario: ' + error.message });
    }
});

export default router;
