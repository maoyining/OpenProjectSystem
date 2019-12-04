module.exports = {


  friendlyName: 'test',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    let p = await UserProject.find({ status:3 });
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
      let a = await User.findOne({id:p[i].user});
      v.applyer=a.username;
      v.applyerID=a.id;
      v.state=p[i].status;
      project.push(v);
    }
    return project;

  }


};
