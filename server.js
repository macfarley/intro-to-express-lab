// Import Express
const express = require('express')

// Create an Express app
const app = express()

// Define routes here:
app.get('/', (req, res) => {
    res.send('<h1>Hello Worlds!</h1>');
  });
