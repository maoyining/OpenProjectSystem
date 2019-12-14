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
      required:true
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
      required:true
    },

    //任务发给的对象
    toStudent:{
      model:'user',
      required:true
    },

    fromTeacher:{
      model:'user',
      required:true
    }


  },

};
