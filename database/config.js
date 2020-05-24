// const knex = require('knex');
// const knexfile = require('../knexfile');

// module.exports = knex(knexfile);

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const environmentConfig = config[environment];
const knex = require('knex');
const connection = knex(environmentConfig);

module.exports = connection;
