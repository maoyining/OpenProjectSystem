module.exports = {


  friendlyName: 'find project list',


  description: '',

  inputs: {
    status:{
      type:'number'
    },
    s:{
      type:'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);
    if(inputs.s===undefined){
      inputs.s='';
    }
    let query = {
      select : attributesToSelect,
      where : {
        status:inputs.status,
        or: [
          { name: { 'contains': inputs.s } },
          { description: { 'contains': inputs.s } },
        ]
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
