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
  'POST /api/v1/project':'admin.add-project',
  'PUT /api/v1/admin/agree':'admin.agree-project',//admin同意导师接这个项目
  'PUT /api/v1/admin/disprove':'admin.disprove-project',//admin不同意


  //学生申请参加项目,在userproject表中建立一条记录，此时表中的status字段为0，表示学生已申请但未受理
  //STUDENT
  'POST /api/v1/student/project':'student.apply-project', //学生申请参加某个项目
  'PUT /api/v1/student/project/agree':'student.agree-project',//老师邀请学生参加项目之后，学生同意参加项目
  'PUT /api/v1/student/project/disagree':'student.disagree-project',//老师邀请学生参加项目之后，学生不同意参加项目

  //TEACHER
  'POST /api/v1/teacher/project':'teacher.apply-project',//老师向admin申请项目
  'PUT /api/v1/teacher/student/agree':'teacher.agree-student',//学生申请参加项目之后,老师同意学生参加项目
  'PUT /api/v1/teacher/student/disagree':'teacher.disagree-student',//学生申请参加项目之后,老师不同意学生参加项目
  'POST /api/v1/teacher/student/invite':'teacher.invite-student',//老师邀请学生参加项目




};
