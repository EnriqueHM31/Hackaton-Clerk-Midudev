import express from 'express';
import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();


const clerkClient = new Clerk({
    secretKey: process.env.CLERK_SECRET_KEY,
});

const router = express.Router();

router.post('/', async (req, res) => {
    const { role, userId } = req.body;

    if (!role || !userId) {
        return res.status(400).json({ message: 'Faltan datos: role o userId' });
    }

    console.log('Asignando rol:', role, 'a usuario:', userId);

    try {
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: { role }
        });

        res.status(200).json({ message: 'Role asignado' });
    } catch (error) {
        console.error('Error al asignar rol:', error);
        return res.status(500).json({ message: 'Error al asignar rol' + error });
    }
});

router.get('/', async (req, res) => {

    try {
        res.status(200).json({ message: 'Si se pudo' });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return res.status(500).json({ message: 'Error al obtener datos' });
    }
});





export default router;
