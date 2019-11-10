/**
 * Project.js
 *
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name:{
      type:'string',
      required: true,
      maxLength: 200
    },

    field:{
      type:'json',
    },

    description:{
      type:'string'
    },

    status:{   //  0 发布  1 进行中  //  2 结项
      type:'number',
      defaultsTo:0,
      isIn:[0,1,2]
    },

    teamSize:{  //团队最大人数
      type:'number',
      defaultsTo:5,
    },

    currentSize:{
      type:'number',
      defaultsTo:1
    },
    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    partners:{
      collection:'user',
      via:'project',
      through:'userproject'
    },

    //导师
    leader:{
      model:'user',
    },

  },

};
