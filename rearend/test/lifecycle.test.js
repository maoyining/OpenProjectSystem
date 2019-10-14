'use strict';

const Sails = require('sails');
const config = require('../config/env/test');
// var Barrels = require('barrels');
config.environment = 'test';

let sails;

global.fixtures = undefined;
let chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
global.expect = chai.expect;
global.should = chai.should();
// global.assert = chai.assert;
global.supertest = require('supertest');
global.helpers = require('./helpers');

before(done => {
  Sails.lift(config, (error, server) => {
    if (error) return done(error);

    sails = server;

    // Barrels does not work for sails-mongodb

    // Moved to beforeEach
    // done();
    helpers.reloadAllData(done);

    // var connectionName = sails.config.models.connection;
    // var connection = sails.config.connections[connectionName];
    // var powFixtures = require('pow-mongodb-fixtures').connect(connection.database, connection);

    // // Files
    // powFixtures.clearAllAndLoad(process.cwd() + '/test/fixtures/powMongo/fixtures.js', done);

    // // Directories (loads all files in the directory)
    // // powFixtures.load(process.cwd() + '/test/fixtures/powMongo', done);
  });
});

after(async () => {

  // await redis.flushdbAsync();
  await sails.lower();

});

// after((done) => {

//   redis.flushdbAsync()
//     .then(() => {
//       sails.lower(done);
//     });

// });
