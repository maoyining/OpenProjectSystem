module.exports = {


  friendlyName: 'student add task for student',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    let values = sails.helpers.filterValuesToSet(this.req);
    values.fromTeacher=this.req.me.id;
    console.log(values);
    await Task.create(values);
    return;

  }


};
