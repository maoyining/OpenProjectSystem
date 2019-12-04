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

    return project;

  }


};
