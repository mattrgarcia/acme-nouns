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
