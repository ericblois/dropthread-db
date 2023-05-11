const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : process.env.PG_LOCAL_HOST,
      user : process.env.PG_LOCAL_USER,
      password : process.env.PG_LOCAL_PASS,
      database : process.env.PG_LOCAL_DATABASE,
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },
  
  cloud_dev: {
    client: 'pg',
    connection: {
      host : process.env.PG_DEV_HOST,
      user : process.env.PG_USER,
      password : process.env.PG_PASS,
      database : process.env.PG_DATABASE,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
