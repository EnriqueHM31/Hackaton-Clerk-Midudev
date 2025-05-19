import { Router } from 'express';
import { query } from '../bd.js'; // Asegúrate que bd.js exporta query para pg

const router = Router();

router.get('/', async (req, res) => {
    res.json({ message: 'Hackaton' });
});

router.get('/all', async (req, res) => {
    try {
        const result = await query('SELECT * FROM hackathons ORDER BY end_date DESC;');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

router.get('/hackaton/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await query('SELECT * FROM hackathons WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Hackatón no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener hackatón:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

router.get('/ganadores/:idHack', async (req, res) => {
    const { idHack } = req.params;

    try {
        const ganadores = await query(
            'SELECT * FROM ganadores WHERE idHack = $1 ORDER BY lugar ASC',
            [idHack]
        );

        res.status(200).json({ ganadores: ganadores.rows });
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
            'SELECT * FROM participaciones WHERE hackathon_id = $1 AND user_id = $2',
            [idHack, idUser]
        );

        res.status(200).json({ result: result.rows });
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
            'SELECT * FROM participaciones WHERE user_id = $1',
            [idUser]
        );

        if (result.rows.length > 0) {
            return res.json(result.rows);
        }

        res.status(200).json(result.rows);
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

    if (!user_id || !username || !hackathon_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos: user_id, username o hackathon_id.' });
    }

    try {
        const result = await query(
            `INSERT INTO participaciones 
        (user_id, username, hackathon_id, github_perfil, nombre_proyecto, repositorio) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [user_id, username, hackathon_id, github_perfil || null, nombre_proyecto || null, repositorio || null]
        );

        res.status(201).json({ message: 'Participación registrada exitosamente.', id: result.rows[0].id });
    } catch (error) {
        // PostgreSQL no tiene código ER_DUP_ENTRY, se usa error.code '23505' para unique violation
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Este usuario ya está registrado en este hackatón.' });
        }

        console.error('Error al registrar participación:', error);
        res.status(500).json({ error: 'Error en la base de datos.' + error.message });
    }


});


router.post('/register', async (req, res) => {
    const {
        user_id,
        nombre,
        descripcion,
        start_date,
        end_date,
        instrucciones,
        imagen,
        lenguajes,
        premios,
        sitio
    } = req.body;

    // Validar campos obligatorios
    if (!user_id || !nombre || !descripcion || !start_date || !end_date || !instrucciones || !lenguajes || !premios || !sitio) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        // Insertar hackathon en la BD
        const result = await query(
            `INSERT INTO hackathons 
      (user_id, nombre, descripcion, start_date, end_date, instrucciones, imagen, lenguajes, premios, sitio, created_at)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8::json, $9::json, $10, NOW())
      RETURNING id`,
            [
                user_id,
                nombre,
                descripcion,
                start_date,
                end_date,
                instrucciones,
                imagen || null,
                JSON.stringify(lenguajes),
                JSON.stringify(premios),
                sitio
            ]
        );

        res.status(201).json({ message: 'Hackathon creado exitosamente', id: result.rows[0].id });
    } catch (error) {
        console.error('Error al crear hackathon:', error);
        res.status(500).json({ error: 'Error en la base de datos: ' + error.message });
    }
});

export default router;
