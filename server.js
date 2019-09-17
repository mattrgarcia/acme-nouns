const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const port = process.env.PORT || 3000;
const { Person, Place, Thing } = db.models;

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(port, ()=> console.log(`Listening on port ${port}`));
