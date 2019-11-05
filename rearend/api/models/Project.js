/**
 * Project.js
 *
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user:{
      collection:'user',
      via:'project',
      through:'UserProject'
    },

  },

  customToJSON: function () {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['password']);
  },

  beforeUpdate: async (values, next) => {
    delete values.username; // username is not allowed to update

    if (false === values.hasOwnProperty('password')) { return next(); }
    if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) { return next(); } // If already hashed

    values.password = await sails.helpers.passwords.hashPassword(values.password);

    return next();
  },

  beforeCreate: async (values, next) => {
    if (false === values.hasOwnProperty('password')) { return next(); }

    values.password = await sails.helpers.passwords.hashPassword(values.password);

    return next();
  }

};
