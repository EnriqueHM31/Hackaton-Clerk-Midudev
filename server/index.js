import express from 'express';
import cors from 'cors';

import usuariosRoutes from './routes/usuarios.js';
import rolesRoutes from './routes/roles.js';

const app = express();
app.use(cors());
app.use(express.json());

// Ruta raíz para probar
app.get('/', (req, res) => {
    res.send('API funcionando 👍');
});

// Rutas API
app.use('/api/users', usuariosRoutes);
app.use('/api/roles', rolesRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
