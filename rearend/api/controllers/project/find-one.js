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
    let a = await User.find({id:project.leader});
    project.leaderName=a.username;
    return project;

  }


};
