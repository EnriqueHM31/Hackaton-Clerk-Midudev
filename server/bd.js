import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',         // Cambia si tienes otro usuario
    password: '1234',         // Cambia si tienes contraseña
    database: 'hackathon'  // Debes crear esta base antes
});

export async function query(sql, params) {
    const [rows] = await connection.execute(sql, params);
    return rows;
}