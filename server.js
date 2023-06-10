require('dotenv').config();
const express = require('express');
const { connect } = require('http2');
const cTable = require('console.table');
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('connect.js');



// Connect to Database
const db = mysql.createConnection (
    {
        database: 'employee_tracker',
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        namedPlaceholders: true,
    },
    console.log('Successfully connect to database')   
);


// // ToDo: Get Request
// app.get('/api/movies', (req, res) => {
//     const sql = `SELECT id, movie_name AS title FROM movies`;
    
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//          return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

// Server Start
app.listen(PORT, function() {
    console.log(`running on http://localhost:${PORT}`)
});