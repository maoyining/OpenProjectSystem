module.exports = {


  friendlyName: 'student apply for project',


  description: '',


  inputs: {
    uid:{
      type:'string',
      required:true
    },
    pid:{
      type:'string',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let db = Project.getDatastore().manager;
    var ProjectCollection = db.collection(Project.tableName);
    await ProjectCollection.findOneAndUpdate({_id:new ObjectId(inputs.pid)},{$inc:{'currentSize':1}});
    await UserProject.update({
      user:inputs.uid,
      project:inputs.pid,
    }).set({
      status:5
    });
    return;

  }


};
