module.exports = {


  friendlyName: 'teacher invite student to join project',


  description: '',


  inputs: {
    pid:{
      type:'string',
      required:true
    },
    uid:{
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
      id:inputs.pid
    });

    if(p.currentSize===p.teamSize){
      throw 'conflict';
    }
    await UserProject.create({
      user:inputs.uid,
      project:inputs.pid,
      status:4
    });
    return;

  }


};
