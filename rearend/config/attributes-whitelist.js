'use strict';

/**
 * Attributes policies
 *
 * - filtering posted values
 * - picking returned values
 *
 * If the whitelist is an array, it is directly used
 * If the whitelist is an object, check:
 *   • whitelist.select
 *   • whitelist.populate
 *   • whitelist.set
 *
 * Note: for select, id is always fetched (and will be add to attributesWhitelist by sails!)
 *       But we always add 'id' explicitly, because we might use it with _.pick when return from in create/update
 *
 */


module.exports.attributesWhitelist = {


  // ╔═╗┬ ┬┌┬┐┬ ┬
  // ╠═╣│ │ │ ├─┤
  // ╩ ╩└─┘ ┴ ┴ ┴
  // 'auth/me': {
  //   select: ['id', 'username', 'avatar', 'no', 'description', 'country', 'city', 'gender', 'stats','role']
  // },
  'admin/add-project':['name','description','teamSize','field','deadline'],
  'teacher/my-project':{
    select:['name','status','teamSize','currentSize']
  },
  'project/find-list':{
    select:['name','status','teamSize','currentSize']
  }
  // 'admin/add-user':['username','password','role','stats','avatar','no','description','country','city','gender','status','fbuid','twuid','inuid'],


};
