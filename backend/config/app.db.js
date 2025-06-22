// TypeORM configuration for SQLite
const { DataSource } = require('typeorm');
const path = require('path');
const Sermon = require('../entities/Sermon');
const Gallery = require('../entities/Gallery');
const Event = require('../entities/Event');
const Service = require('../entities/Service');

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: path.join(__dirname, '../../database.sqlite'),
    synchronize: true, // Set to false in production
    logging: false,
    entities: [Sermon, Gallery, Event, Service],
    migrations: [],
    subscribers: [],
});

module.exports = { AppDataSource };
