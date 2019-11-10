/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */

module.exports.globals = {

  /****************************************************************************
  *                                                                           *
  * Whether to expose the locally-installed Lodash as a global variable       *
  * (`_`), making  it accessible throughout your app.                         *
  *                                                                           *
  ****************************************************************************/

  _: require('lodash'), // _: require('@sailshq/lodash'),

  /****************************************************************************
  *                                                                           *
  * This app was generated without a dependency on the "async" NPM package.   *
  *                                                                           *
  * > Don't worry!  This is totally unrelated to JavaScript's "async/await".  *
  * > Your code can (and probably should) use `await` as much as possible.    *
  *                                                                           *
  ****************************************************************************/

  async: false,

  /****************************************************************************
  *                                                                           *
  * Whether to expose each of your app's models as global variables.          *
  * (See the link at the top of this file for more information.)              *
  *                                                                           *
  ****************************************************************************/

  models: true,

  /****************************************************************************
  *                                                                           *
  * Whether to expose the Sails app instance as a global variable (`sails`),  *
  * making it accessible throughout your app.                                 *
  *                                                                           *
  ****************************************************************************/

  sails: true,

};

global.ObjectId = require('mongodb').ObjectID;

global.constants = {
  // User role
  ROLE_ADMIN: 1,
  ROLE_STUDENT: 2,
  ROLE_TEACHER: 3,

  ENTRY_STATUS_STANDBY: 1,  // 未开始
  ENTRY_STATUS_TRANSIT: 2,  // 运输中
  ENTRY_STATUS_ARRIVED: 3,  // 到达
  ENTRY_STATUS_UNLOADING: 4,  // 卸货中
  ENTRY_STATUS_FINISHED: 5,  // 入库完成

  ENTRY_STATE_NORMAL: 1,  // 正常
  ENTRY_STATE_ARCHIVED: 2,  // 存档
  ENTRY_STATE_REMOVED: 3,  // 已删除

  ITEM_STATUS_NOT_SCANNED: 1, // 未扫描
  ITEM_STATUS_SCANNED: 2,  // 已扫描
  ITEM_STATUS_ENTRY: 3,  // 已入库
  ITEM_STATUS_NOT_EXIST: 4   // 不存在
};

