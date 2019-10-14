/**
 * Note:
 *   use _id for type: 'model' & type: 'collection'
 *   use _id.toString() for type: 'string'
 */

var id = require('pow-mongodb-fixtures').createObjectId;

// ╦ ╦┌─┐┌─┐┬─┐
// ║ ║└─┐├┤ ├┬┘
// ╚═╝└─┘└─┘┴└─
var users = exports.user = {
  user1: { // web admin
    _id    : id(),
    username: 'a@a.net',
    password: '123',
    role: 1 // constants.ROLE_ADMIN
  },
  user2: {
    _id    : id(),
    username: 'b@b.net',
    password: '123456',
    role: 2 // constants.ROLE_OFFICER
  }
};

// ╦  ┌─┐┌─┐┌─┐┌┬┐┬┌─┐┌┐┌
// ║  │ ││  ├─┤ │ ││ ││││
// ╩═╝└─┘└─┘┴ ┴ ┴ ┴└─┘┘└┘
var locations = exports.location = {
  location1: {
    _id   : id(),
    name: 'A1-1',
    trayNum: 2
  },
  location2: {
    _id   : id(),
    name: 'A1-2',
    trayNum: 2,
    trays: [{
      serial: 'serial1',
      items: []
    }, {
      serial: 'serial2',
      items: []
    }]
  },
  location3: {
    _id   : id(),
    name: 'A1-3',
    trayNum: 2
  },
  location4: {
    _id   : id(),
    name: 'B1-1',
    trayNum: 2,
    trays: [{
      serial: 'serial1',
      items: []
    }, null]
  },
  location5: {
    _id   : id(),
    name: 'B1-2',
    trayNum: 2
  },
  location6: {
    _id   : id(),
    name: 'B1-3',
    trayNum: 2
  }
};

// ╔═╗┌┐┌┌┬┐┬─┐┬ ┬
// ║╣ │││ │ ├┬┘└┬┘
// ╚═╝┘└┘ ┴ ┴└─ ┴
var entries = exports.entry = {
  entry1: {
    _id   : id(),
    status: 3,
    mobileTicket: 'entry1'
  },
  entry2: {
    _id   : id(),
    status: 3,
    mobileTicket: 'entry2'
  }
};

// ╔═╗┌─┐┌─┐┬┌─
// ╠═╝├─┤│  ├┴┐
// ╩  ┴ ┴└─┘┴ ┴
var packs = exports.pack = {
  pack1: {
    _id   : id(),
    serial: 'serial1',
    count: 10,
    entry: entries.entry1._id
  },
  pack2: {
    _id   : id(),
    serial: 'serial2',
    count: 22,
    entry: entries.entry1._id
  },
  pack3: {
    _id   : id(),
    serial: 'serial1',
    count: 5,
    entry: entries.entry1._id
  },
  pack4: {
    _id   : id(),
    serial: 'serial1',
    count: 6,
    entry: entries.entry1._id
  },
  pack5: {
    _id   : id(),
    serial: 'serial3',
    count: 33,
    entry: entries.entry1._id
  },
  pack6: {
    _id   : id(),
    serial: 'serial1',
    count: 1,
    entry: entries.entry1._id,
    location: locations.location2._id,
    trayIndex: 0
  },
  pack7: {
    _id   : id(),
    serial: 'serial1',
    count: 2,
    entry: entries.entry1._id,
    location: locations.location2._id,
    trayIndex: 1
  },
  pack8: {
    _id   : id(),
    serial: 'serial2',
    count: 3,
    entry: entries.entry1._id,
    location: locations.location4._id,
    trayIndex: 0
  }
};


// ╦┌┬┐┌─┐┌┬┐
// ║ │ ├┤ │││
// ╩ ┴ └─┘┴ ┴
var items = exports.item = {
  item1: {
    _id   : id(),
    status: 2,
    ticket: 'item1',
    serial: 'serial1',
    count: 10,
    entry: entries.entry1._id
  },
  item2: {
    _id   : id(),
    status: 2,
    ticket: 'item2',
    serial: 'serial2',
    count: 20,
    entry: entries.entry1._id
  }
};
