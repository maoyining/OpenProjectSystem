/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    username: {
      type: 'string',
      unique: true,
      required: true,
      maxLength: 200
    },

    password: {
      type: 'string',
      required: true,
      protect: true
    },

    //学号
    no:{
      type:'string',
      required:true,
      maxLength:8,
      unique:true
    },

    // 1: web admin
    // 2: student
    // 3: teacher
    role: {
      type: 'number',
      defaultsTo:2
    },

    academy:{
      type:'string',
      required:true
    },

    field:{
      type:'json',
    },

    description:{
      type:'string'
    },

    phone:{
      type:'string',
      required:true
    },

    gender:{
      type:'number',
      defaultsTo:1,
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    project:{
      collection:'project',
      via:'user',
      through:'userproject'
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
