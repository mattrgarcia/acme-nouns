const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const port = process.env.PORT || 3000;
const { Person, Place, Thing } = db.models;

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/people', (req, res, next)=> {
  Person.findAll()
    .then( people => res.send(people))
    .catch(next)
});

app.get('/api/places', (req, res, next)=> {
  Place.findAll()
    .then( places => res.send(places))
    .catch(next)
});

app.get('/api/things', (req, res, next)=> {
  Thing.findAll()
    .then( things => res.send(things))
    .catch(next)
});


db.syncAndSeed()
  .then(() => {
    app.listen(port, ()=> console.log(`Listening on port ${port}`));
});

