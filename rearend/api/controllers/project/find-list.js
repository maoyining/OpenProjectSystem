module.exports = {


  friendlyName: 'find project list',


  description: '',

  inputs: {
    status:{
      type:'number'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);
    let query = {
      select : attributesToSelect,
      where : {
        status:inputs.status
      },
    };
    let project = await Project.find(query);
    for(let i=0; i<project.length; i++){
      if(project[i].leader!==null){
        let a =await User.findOne({id:project[i].leader});
        project[i].leaderName=a.username;
      }
    }
    return project;

  }


};
