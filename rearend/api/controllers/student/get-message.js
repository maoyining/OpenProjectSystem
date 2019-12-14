// module.exports = {


//   friendlyName: 'test',


//   description: '',


//   inputs: {

//   },


//   exits: {

//   },


//   fn: async function () {
//     let p = await UserProject.find({ user:this.req.me.id,status: [3,4,5,7,8]});
//     let project=[];
//     let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);
//     for(let i in p){
//       let query = {
//         where : {
//           id : p[i].project
//         },
//         select : attributesToSelect,
//       };
//       let v = await Project.findOne(query);
//       let a = await User.findOne({id:v.leader});
//       v.leaderName=a.username;
//       v.state=p[i].status;
//       project.push(v);
//     }
//     return project;

//   }


// };
