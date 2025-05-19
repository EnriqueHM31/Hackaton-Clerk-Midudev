import { json, Router } from 'express';
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


router.get('/hackaton/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await query('SELECT * FROM hackathons WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Hackatón no encontrado' });
        }

        res.json(result[0]);
    } catch (error) {
        console.error('Error al obtener hackatón:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

router.get('/ganadores/:idHack', async (req, res) => {
    const { idHack } = req.params;

    try {
        const ganadores = await query(
            'SELECT * FROM ganadores WHERE idHack = ? ORDER BY lugar ASC',
            [idHack]
        );


        res.status(200).json({ ganadores });
    } catch (error) {
        console.error('Error al obtener ganadores:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

// GET /api/participaciones?idHack=1&idUser=abc123
router.get('/participaciones', async (req, res) => {
    const { idHack, idUser } = req.query;

    if (!idHack || !idUser) {
        return res.status(400).json({ error: 'Parámetros hackathon_id e user_id son requeridos' });
    }


    try {
        const result = await query(
            'SELECT * FROM participaciones WHERE hackathon_id = ? AND user_id = ?',
            [idHack, idUser]
        );


        res.status(200).json({ result });
    } catch (error) {
        console.error('Error al obtener participación:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

router.get('/participaciones/idusuario', async (req, res) => {
    const { idUser } = req.query;

    if (!idUser) {
        return res.status(400).json({ error: 'Parámetro user_id es requerido' });
    }

    try {
        const result = await query(
            'SELECT hackathon_id FROM participaciones WHERE user_id = ?',
            [idUser]
        );

        if (result.length > 0) {
            res.json(result);
        }


        res.status(200).json({ message: 'No se encontró la participación' });
    } catch (error) {
        console.error('Error al obtener participación:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});


router.post('/participaciones', async (req, res) => {
    const {
        user_id,
        username,
        hackathon_id,
        github_perfil,
        nombre_proyecto,
        repositorio
    } = req.body;

    // Validar campos requeridos
    if (!user_id || !username || !hackathon_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos: user_id, username o hackathon_id.' });
    }

    try {
        // Intentar insertar la participación
        const result = await query(
            'INSERT INTO participaciones (user_id, username, hackathon_id, github_perfil, nombre_proyecto, repositorio) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, username, hackathon_id, github_perfil || null, nombre_proyecto || null, repositorio || null]
        );

        res.status(201).json({ message: 'Participación registrada exitosamente.', id: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Este usuario ya está registrado en este hackatón.' });
        }

        console.error('Error al registrar participación:', error);
        res.status(500).json({ error: 'Error en la base de datos.' + error });
    }
});




export default router;