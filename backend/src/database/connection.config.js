// import { config } from 'dotenv';
// import { createPool } from 'mysql';

import { config } from 'dotenv'
import mariadb from "mariadb";

config(); // Cargar las variables de entorno desde .env

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// function connectDB() {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to MySQL database:', err);
//       return;
//     }
//     console.log('Connection to MySQL database successful');
//     connection.release();
//   });
// }

// function getConnection() {
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(connection);
//     });
//   });
// }


async function connectDB() {
  let conn;
  try {
      conn = await pool.getConnection();
      console.log('Connection with encomienda db is successful');
  } catch (err) {
      console.error(err);
  } finally {
      if (conn) conn.end();
  }
} 

async function getConnection() {
  return pool.getConnection();
}

export { connectDB, getConnection };
