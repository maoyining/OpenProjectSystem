module.exports = {


  friendlyName: 'find one project',


  description: '',


  inputs: {
    id:{
      type:'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let project = await Project.findOne({id:inputs.id});

    return project;

  }


};
