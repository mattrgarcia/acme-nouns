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

Person.belongsTo(Place);
Place.hasMany(Person);
Thing.belongsTo(Person);
Person.hasMany(Thing);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const places = [
    {name: 'SLO'},
    {name: 'Los Osos'},
    {name: 'Paso Robles'}
  ];
  const [SLO, LosOsos, PasoRobles] = await Promise.all(places.map(place => Place.create(place)));

  const people = [
    {name: 'Matt', placeId: PasoRobles.id },
    {name: 'Robert', placeId: LosOsos.id },
    {name: 'Carl', placeId: SLO.id }
  ];
  const [Matt, Robert, Carl ] = await Promise.all(people.map(person => Person.create(person)));

  const things = [
    {name: 'water', personId: Matt.id },
    {name: 'pizza', personId: Matt.id },
    {name: 'rocks', personId: Robert.id }
  ];

  await Promise.all(things.map(thing => Thing.create(thing)));
};

syncAndSeed();
