module.exports = {


  friendlyName: 'teacher project',


  description: '',


  inputs: {
    state:{
      type:'ref', //1,2,6
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let p = await UserProject.find({user:this.req.me.id,status:inputs.state});
    let project=[];
    let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);

    for(let i in p){
      let query = {
        where : {
          id : p[i].project,
        },
        select : attributesToSelect,
      };
      let v = await Project.findOne(query);
      if(v.leader!==null){
        let a = await User.findOne({id:v.leader});
        v.leaderName=a.username;
      }

      v.state=p[i].status;
      project.push(v);
    }
    return project;

  }


};
