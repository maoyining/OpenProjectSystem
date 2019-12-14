module.exports = {


  friendlyName: 'task',


  description: '',


  inputs: {
    id:{
      type:'string'
    }
  },


  exits: {

  },

  fn: async function (inputs) {
    let t = await Task.find({ project:inputs.id });
    let task=[];
    for(let i in t){
      let v = t[i];
      let p = await Project.findOne({id:t[i].project});
      let u = await User.findOne({id:t[i].fromTeacher});
      let stu = await User.findOne({id:t[i].toStudent});
      v.projectName = p.name;
      v.fromTeacherName = u.username;
      v.toStudentName = stu.username;
      task.push(v);
    }
    return task;

  }


};
