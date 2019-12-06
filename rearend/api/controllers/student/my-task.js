module.exports = {


  friendlyName: 'student task',


  description: '',


  inputs: {
    status:{
      type:'number'
    }
  },


  exits: {

  },

  fn: async function (inputs) {
    let t = await Task.find({ toStudent:this.req.me.id ,status:inputs.status});
    let task=[];
    for(let i in t){
      let v = t[i];
      let p = await Project.findOne({id:t[i].project});
      let u = await User.findOne({id:t[i].fromTeacher});

      v.projectName = p.name;
      v.fromTeacherName = u.username;
      task.push(v);
    }
    return task;

  }


};
