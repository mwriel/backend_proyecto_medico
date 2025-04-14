import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nombre_base_datos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Probar la conexión al iniciar
async function initializeConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a MySQL establecida correctamente');
    connection.release(); // Liberar la conexión
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
    process.exit(1);
  }
}

initializeConnection();

export default pool;