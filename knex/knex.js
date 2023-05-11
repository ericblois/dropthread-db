require('dotenv').config();
const environment = process.env.ENVIRONMENT || 'local_dev'
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);