import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.connect()
    .then(client => {
        console.log('Conexión exitosa a la DB');
        client.release();
    })
    .catch(err => {
        console.error('Error conectando a la DB:', err);
    });

export const query = (text, params) => pool.query(text, params);
