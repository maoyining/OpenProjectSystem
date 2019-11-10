module.exports = {


  friendlyName: 'student apply for project',


  description: '',


  inputs: {
    id:{
      type:'string',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    await UserProject.update({
      user:this.req.me.id,
      project:inputs.id,
    }).set({
      status:8
    });
    return;

  }


};
