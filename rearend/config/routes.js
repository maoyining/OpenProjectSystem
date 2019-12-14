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
  'PUT /api/v1/student/agree':'student.agree-project',
  'PUT /api/v1/student/disagree':'student.disagree-project',
  'GET /api/v1/student/project':'student.my-project',
  'GET /api/v1/student/message':'student.get-message',
  'GET /api/v1/student/task':'student.my-task',


  //TEACHER
  'POST /api/v1/teacher/project':'teacher.apply-project',
  'PUT /api/v1/teacher/agree':'teacher.agree-student',//DONE
  'PUT /api/v1/teacher/disagree':'teacher.disagree-student',//DONE
  'POST /api/v1/teacher/student/invite':'teacher.invite-student',
  'GET /api/v1/teacher/project':'teacher.my-project',
  'GET /api/v1/teacher/message':'teacher.get-message',
  'POST /api/v1/teacher/task':'teacher.add-task',
  'GET /api/v1/teacher/task':'teacher.my-task',
  //PROJECT
  'GET /api/v1/project/:id':'project.find-one',
  'GET /api/v1/project':'project.find-list',

  //TASK
  'GET /api/v1/task/:id':'task.find-one',

  //USER
  'GET /api/v1/user':'auth.findlist-user',
  'GET /api/v1/user/:id':'auth.findone-user',
  'PUT /api/v1/user':'auth.update-user'

};
