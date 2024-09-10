import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mysql from 'mysql2/promise'; // Replace with your DB setup

const app = express();
const PORT = 3001;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database connection setup (adjust to your setup)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'EthanKim201124397',
  database: 'exercise_tracker'
});

// Test database connection on startup
const testDatabaseConnection = async () => {
  try {
    await db.query('SELECT 1');
    console.log('Successfully connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
};
testDatabaseConnection();

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API server!');
});

// Route to create a new exercise
app.post('/exercises', async (req, res) => {
  const { name, sets, reps } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO exercises (name, sets, reps) VALUES (?, ?, ?)',
      [name, sets || 0, reps || 0]
    );
    res.json({ message: 'Exercise added successfully!', exerciseId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add exercise', details: err.message });
  }
});

// Route to delete an exercise by ID
app.delete('/exercises/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM exercises WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Exercise deleted successfully!' });
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete exercise', details: err.message });
  }
});

// Route to fetch all exercises
app.get('/exercises', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM exercises');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exercises', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
