module.exports = {


  friendlyName: 'test',


  description: '',


  inputs: {
    state:{
      type:'ref' //3,4,5,7,8
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let p = await UserProject.find({ status:inputs.state });
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
      if(v.leader!==null&&v.leader===this.req.me.id){
        project.push(v);
      }
    }
    return project;

  }


};
