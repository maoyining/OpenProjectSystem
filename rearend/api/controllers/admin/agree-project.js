module.exports = {


  friendlyName: 'agree teacher to take over',


  description: '',


  inputs: {
    uid:{
      type:'string',
      required:true
    },
    pid:{
      type:'string',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    await UserProject.update({
      user:inputs.uid,
      project:inputs.pid,
    }).set({
      status:2
    });

    await Project.update({
      id:inputs.pid
    }).set({
      leader:inputs.uid,
      status:1
    });
    return;

  }


};
