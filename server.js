const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20062004',
    database: 'lomba-agustus'
});

// Connect to the database
connection.connect();

// Endpoint to get news articles
app.get('/api/news', (req, res) => {
    connection.query('SELECT * FROM articles ORDER BY date DESC', (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Database query error' });
            return;
        }
        // Send results as JSON
        res.json(results);
    });
});

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
