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

    console.log(this.req.me.id);
    console.log(inputs.id);
    await UserProject.create({
      user:this.req.me.id,
      project:inputs.id,
      status:0
    });
    return;

  }


};
