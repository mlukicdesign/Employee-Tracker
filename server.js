require('dotenv').config();
const express = require('express');
const { connect } = require('http2');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('connect.js');

app.listen(PORT, function() {
    console.log(`running on http://localhost:${PORT}`)
});