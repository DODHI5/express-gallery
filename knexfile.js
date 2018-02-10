// Update with your config settings.
const path = require(`path`);
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "art_user",
      password: "password",
      database: "art_user_dev",
      charset: "utf8"
    },
    debug: true,
    migrations: {
      directory: path.join(__dirname + "/knex/migrations")
    },
    seeds: {
      directory: path.join(__dirname + "/knex/seeds")
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
