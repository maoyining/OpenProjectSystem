module.exports = {


  friendlyName: 'teacher task',


  description: '',


  inputs: {
    status:{
      type:'number'
    }
  },


  exits: {

  },

  fn: async function (inputs) {
    let t = await Task.find({ fromTeacher:this.req.me.id ,status:inputs.status});
    let task=[];
    for(let i in t){
      let v = t[i];
      let p = await Project.findOne({id:t[i].project});
      let u = await User.findOne({id:t[i].toStudent});
      v.projectName = p.name;
      v.toStudentName = u.username;
      task.push(v);
    }
    return task;

  }


};
