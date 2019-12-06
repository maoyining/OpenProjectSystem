/**
 * Task.js
 *
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    title:{
      type:'string',
      required: true,
      maxLength: 200
    },

    content:{
      type:'string',
    },

    status:{   //  0 进行中  1截止
      type:'number',
      defaultsTo:0,
      isIn:[0,1]
    },

    deadline:{
      type:'string',
      required: true
    },
    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    //项目
    project:{
      model:'user',
    },

    //任务发给的对象
    toStudent:{
      model:'user'
    },

    fromTeacher:{
      model:'user'
    }


  },

};
