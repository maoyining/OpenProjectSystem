module.exports = {


  friendlyName: 'test',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    let p = await UserProject.find({ status:4 });
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
      let a = await User.findOne({id:this.req.me.id});
      v.leaderName=a.username;
      v.leader=a.id;
      v.state=p[i].status;
      project.push(v);
    }
    return project;

  }


};
