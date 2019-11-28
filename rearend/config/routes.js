/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //DONE
  'POST /api/v1/auth/signin': 'auth.signin',
  'GET /api/v1/auth/me': 'auth.me',
  'PUT /api/v1/auth/update/password': 'auth.update-password',


  //ADMIN DONE
  'POST /api/v1/admin/project':'admin.add-project',
  'PUT /api/v1/admin/agree':'admin.agree-project',
  'PUT /api/v1/admin/disprove':'admin.disprove-project',


  //学生申请参加项目,在userproject表中建立一条记录，此时表中的status字段为0，表示学生已申请但未受理
  //STUDENT
  'POST /api/v1/student/project':'student.apply-project', //DONE
  'PUT /api/v1/student/project/agree':'student.agree-project',//修改status字段为2表示申请成功学生已在项目组中
  'PUT /api/v1/student/project/disagree':'student.disagree-project',//修改status字段为4
  'GET /api/v1/student/project':'student.my-project',

  //TEACHER
  'POST /api/v1/teacher/project':'teacher.apply-project',
  'PUT /api/v1/teacher/student/agree':'teacher.agree-student',//DONE
  'PUT /api/v1/teacher/student/disagree':'teacher.disagree-student',//DONE
  'POST /api/v1/teacher/student/invite':'teacher.invite-student',
  'GET /api/v1/teacher/project':'teacher.my-project',

  //PROJECT  for HSR
  'GET /api/v1/project/:id':'project.find-one',
  'GET /api/v1/project':'project.find-lists'

};
