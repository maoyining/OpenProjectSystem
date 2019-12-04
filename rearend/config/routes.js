/* eslint-disable linebreak-style */
/*
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //AUTH
  'POST /api/v1/auth/signin': 'auth.signin',
  'GET /api/v1/auth/me': 'auth.me',
  'PUT /api/v1/auth/update/password': 'auth.update-password',

  //ADMIN DONE
  'POST /api/v1/admin/project':'admin.add-project',
  'PUT /api/v1/admin/agree':'admin.agree-project',
  'PUT /api/v1/admin/disagree':'admin.disprove-project',
  'GET /api/v1/admin/message':'admin.get-message',

  //STUDENT
  'POST /api/v1/student/project':'student.apply-project', //DONE
  'PUT /api/v1/student/project/agree':'student.agree-project',
  'PUT /api/v1/student/project/disagree':'student.disagree-project',
  'GET /api/v1/student/project':'student.my-project',
  'GET /api/v1/student/message':'student.get-message',

  //TEACHER
  'POST /api/v1/teacher/project':'teacher.apply-project',
  'PUT /api/v1/teacher/student/agree':'teacher.agree-student',//DONE
  'PUT /api/v1/teacher/student/disagree':'teacher.disagree-student',//DONE
  'POST /api/v1/teacher/student/invite':'teacher.invite-student',
  'GET /api/v1/teacher/project':'teacher.my-project',
  'GET /api/v1/teacher/message':'teacher.get-message',
  //PROJECT
  'GET /api/v1/project/:id':'project.find-one',
  'GET /api/v1/project':'project.find-list',

  //USER
  'GET /api/v1/user':'auth.findlist-user',
  'GET /api/v1/user/:id':'auth.findone-user',
  'PUT /api/v1/user':'auth.update-user'

};
