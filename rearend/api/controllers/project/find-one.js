module.exports = {


  friendlyName: 'find one project',


  description: '',


  inputs: {
    id:{
      type:'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let project = await Project.findOne({id:inputs.id});
    let a =await User.findOne({id:project.leader});
    if(project.leader!==null){
      project.leaderName=a.username;
    }
    let m = await UserProject.find({project:inputs.id,status:5});
    let member = [];
    for(let i in m){
      let query = {
        where: {
          id: m[i].user,
        },
        select: ['id', 'username']
      };
      let v = await User.findOne(query);
      member.push(v);
    }
    project.member=member;
    return project;

  }


};
