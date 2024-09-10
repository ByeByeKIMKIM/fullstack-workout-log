import mysql from 'mysql2';

// Creating a pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'EthanKim201124397',
  database: 'exercise_tracker'
});

// Pool.getConnection() attempts to connect to the DB
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database.');
    connection.release();
  }
});

export default pool.promise(); // Export the promise-based pool
