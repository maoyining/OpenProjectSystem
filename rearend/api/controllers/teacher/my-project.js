module.exports = {


  friendlyName: 'teacher project',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    let p = await UserProject.find({user:this.req.me.id});
    let project=[];
    let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);

    for(let i in p){
      let query = {
        where : {
          id : p[i].project
        },
        select : attributesToSelect,
      };
      let v = await Project.findOne(query);
      v.state=p[i].status;
      project.push(v);
    }
    return project;

  }


};
