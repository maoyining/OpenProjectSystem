/**
 * UserProject.js
 *
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    user:{
      model:'user',
      required:true
    },
    project:{
      model:'project',
      required:true
    },
    status:{ //0学生申请中导师未通过  1导师通过已在项目组  2导师未通过
      type:'number',
      defaultsTo:0
    },
    deal:{
      type:'boolean',
      defaultsTo:false
    }
  }

};
