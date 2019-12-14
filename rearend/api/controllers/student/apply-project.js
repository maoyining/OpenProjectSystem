module.exports = {


  friendlyName: 'student apply for project',


  description: '',


  inputs: {
    id:{
      type:'string',
      required:true
    }
  },


  exits: {
    conflict:{
      responseType: 'conflict'
    }
  },


  fn: async function (inputs) {

    let p = await Project.findOne({
      id:inputs.id
    });

    if(p.currentSize===p.teamSize){
      throw 'conflict';
    }
    let res=await UserProject.findOne({user:this.req.me.id,project:inputs.id});
    if(res){
      throw 'conflict';
    }
    // await UserProject.create({
    //   user:this.req.me.id,
    //   project:inputs.id,
    //   status:3
    // });
    return;

  }


};
