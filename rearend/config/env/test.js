'use strict';

/**
 * Test environment settings
 * @description :: This section overrides all other config values ONLY in test environment
 */

module.exports = {
  port: process.env.PORT || 8090,
  log: {
    level: 'silent'
  },
  datastores: {
    mongo: {
      adapter: 'sails-mongo',
      host: 'localhost',
      port: 27017,
      user: '',
      password: '',
      database: 'wh-testing'
    }
  },
  models: {
    datastore: 'mongo',
    migrate: 'drop'
  },
  migrations: {
    datastore: 'mongo'
  },
  custom: {
    datastores: {
      redis: {
        db: '9'
      }
    }
  },
  // policies: {
  //   '*': true
  // },
  hooks: {
    grunt: false,
    session: false,
    views: false,
    pubsub: false
  }
};
