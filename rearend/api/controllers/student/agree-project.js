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

  },


  fn: async function (inputs) {

    let db = Project.getDatastore().manager;
    var ProjectCollection = db.collection(Project.tableName);
    await ProjectCollection.findOneAndUpdate({_id:new ObjectId(inputs.id)},{$inc:{'currentSize':1}});

    await UserProject.update({
      user:this.req.me.id,
      project:inputs.id,
    }).set({
      status:5
    });
    return;

  }


};
