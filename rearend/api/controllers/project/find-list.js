module.exports = {


  friendlyName: 'find project list',


  description: '',

  inputs: {

  },


  exits: {

  },


  fn: async function () {

    let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);
    let query = {
      select : attributesToSelect,
    };
    let project = await Project.find(query);

    return project;

  }


};
