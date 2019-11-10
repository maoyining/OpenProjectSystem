module.exports = {


  friendlyName: 'teacher apply for project',


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

    await UserProject.create({
      user:this.req.me.id,
      project:inputs.id,
      status:1
    });
    return;

  }


};
