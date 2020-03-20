/*
 * @Author: Nianko 
 * @Date: 2020-03-19 19:58:26 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 09:28:51
 */

const fs = require("fs");

let files = fs.readdirSync(__dirname); //同步遍历目录

let js_files = files.filter((f) => {
  return f.endsWith('.js') && !f.endsWith('index.js');
}, files);
module.exports = {};

for (let f of js_files) {
  let name = f.substring(0, f.length - 3); //User.js ==> name : User
  module.exports[name] = require('./' + f);
}