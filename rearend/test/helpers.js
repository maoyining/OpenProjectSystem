var fixtures = require('./fixtures/powMongo/fixtures.js');
const jwt = require('jsonwebtoken');

var tokens = {};

function getToken(userId) {
  if (!tokens[userId]) {
    tokens[userId] = 'Bearer ' + jwt.sign({
      id: userId
    }, sails.config.auth.jwt.secretKey, { expiresIn: sails.config.auth.jwt.expiresIn });
  }
  return tokens[userId];
}

function reloadAllData(done) {
  var datastoreName = sails.config.models.datastore;
  var datastore = sails.config.datastores[datastoreName];
  var powFixtures = require('pow-mongodb-fixtures').connect(datastore.database, datastore);

  powFixtures.addModifier( async (collectionName, doc, cb) => {
    if (collectionName === 'user') {
      // Because we will load data multiple times by calling clearAllAndLoad,
      // pasword might already be hashed.
      if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(doc.password)) {
        return cb(null, doc);
      }

      doc.password = await sails.helpers.passwords.hashPassword(doc.password);

      return cb(null, doc);

    } else {
      return cb(null, doc);
    }
  });

  powFixtures.clearAllAndLoad(process.cwd() + '/test/fixtures/powMongo/fixtures.js', done);
}

module.exports = {
  reloadAllData       : reloadAllData,
  fixtures            : fixtures,
  getToken            : getToken
};
