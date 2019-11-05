/**
 * Usage
 * sails run set-seed-data
 *
 * for production env
 * sails_environment=production sails_hooks__http=false sails_hooks__request=false sails_hooks__response=false sails_hooks__blueprints=false sails_hooks__policies=false sails_hooks__security=false sails_hooks__logger=false sails_hooks__grunt=false sails_hooks__sockets=false sails_hooks__cron=false sails_hooks__mongoat=false sails_hooks__winston=false sails_hooks__views=false node ./node_modules/sails/bin/sails.js run set-seed-data
 * Disable hooks:
 *   http
 *   request
 *   response
 *   blueprints
 *   policies
 *   security
 *   logger
 *   grunt
 *   views
 *   sockets
 *   cronnpm
 *   mongoat
 *   custom-blueprints (auto disabled by disabling blueprints)
 *   winston (optional, for sails.log)
 */
const XLSX = require('xlsx');
module.exports = {


  friendlyName: 'import student information',

  fn: async function (inputs, exits) {

    let initialValues=[];
    let xlsxFile = XLSX.readFile('scripts/student.xlsx');
    let sheets = Object.keys(xlsxFile.Sheets);
    let sheetName = sheets[0];
    let content=[];
    content = xlsxFile.Sheets[sheetName];
    const header = ['no', 'gender','username', 'password','academy','phone'];
    content = XLSX.utils.sheet_to_json(content, { header: header });
    content.shift();
    initialValues=content.map(v=>{
      v.genger=1;
      if(v.gender==='女'){
        v.gender=2;
      }
      return v;
    });
    console.log(initialValues);
    await User.createEach(initialValues);
    return exits.success();

  }


};

