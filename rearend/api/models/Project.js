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
    //项目名称
    name:{
      type:'string',
      required: true,
      maxLength: 200
    },
    //项目参与者
    partner:{
      collection:'user',
      via:'project',
      through:'UserProject'
    },
    //导师
    leader:{
      collection:'user',
      via:'project',
      through:'UserProject'
    },
    //技术领域
    field:{
      type:'json',
    },
    //项目描述
    description:{
      type:'string'
    },
    /*
      项目状态
      0 发布
      1 进行中
      2 结项
    */
    status:{
      type:'number',
      defaultsTo:0
    },
    //团队最大人数，默认为5
    teamSize:{
      type:'number',
      defaultsTo:5,
    }

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
