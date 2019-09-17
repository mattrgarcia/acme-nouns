const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/acme-nouns-db');
const { STRING, UUID, UUIDV4 } = Sequelize;

const Person = conn.define('person', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    notEmpty: true
  }
});
const Place = conn.define('place', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    notEmpty: true
  }
});
const Thing = conn.define('thing', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    notEmpty: true
  }
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const people = [
    {name: 'Matt'},
    {name: 'Robert'},
    {name: 'Carl'}
  ];
  const places = [
    {name: 'SLO'},
    {name: 'Los Osos'},
    {name: 'Paso Robles'}
  ];
  const things = [
    {name: 'water'},
    {name: 'pizza'},
    {name: 'rocks'}
  ];
  await Promise.all(people.map(person => Person.create(person)));
  await Promise.all(places.map(place => Place.create(place)));
  await Promise.all(things.map(thing => Thing.create(thing)));
};

syncAndSeed();
