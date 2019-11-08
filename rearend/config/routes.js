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
  'PUT /api/v1/auth/update-password': 'auth.update-password',

  'POST /api/v1/project':'project.add',

  //学生申请参加项目,在userproject表中建立一条记录，此时表中的status字段为0，表示学生已申请但未受理
  'POST /api/v1/student/project':'student.apply-project',

  //TODO
  'POST /api/v1/teacher/student':'teacher.invite-student',//仿照学生申请参加项目，新建一条记录，status字段为1表示导师已邀请但未受理
  'PUT /api/v1/teacher/student/agree':'teacher.agree',//修改status字段为2表示申请成功学生已在项目组中
  'PUT /api/v1/student/project/agree':'student.agree',//修改status字段为2表示申请成功学生已在项目组中
  'PUT /api/v1/teacher/student/disagree':'teacher.disagree',//修改status字段为3
  'PUT /api/v1/student/project/disagree':'student.disagree'//修改status字段为4




};
