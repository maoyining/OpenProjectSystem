module.exports = {


  friendlyName: 'find one task',


  description: '',


  inputs: {
    id:{
      type:'string'
    }
  },


  exits: {

  },

  fn: async function (inputs) {
    let t = await Task.findOne({id:inputs.id});
    let p = await Project.findOne({id:t.project});
    let u = await User.findOne({id:t.fromTeacher});
    t.projectName = p.name;
    t.fromTeacherName = u.username;
    return t;

  }


};
