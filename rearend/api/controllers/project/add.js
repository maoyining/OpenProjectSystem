module.exports = {


  friendlyName: 'test',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    let values = sails.helpers.filterValuesToSet(this.req);
    await Project.create(values);
    return;

  }


};
