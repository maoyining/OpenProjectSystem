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
    conflict:{
      responseType: 'conflict'
    }
  },


  fn: async function (inputs) {

    let p = await Project.findOne({
      id:inputs.id
    });

    if(p.currentSize===p.teamSize){
      throw 'conflict';
    }
    await UserProject.create({
      user:this.req.me.id,
      project:inputs.id,
      status:3
    });
    return;

  }


};