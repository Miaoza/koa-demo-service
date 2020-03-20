/*
 * @Author: Nianko 
 * @Date: 2020-03-19 16:28:47 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-19 19:56:39
 */

const Sequelize = require("sequelize");
const sequelize = require('../database/db');

const { INTEGER, STRING, DATE } = Sequelize

const Users = sequelize.define('users', {
  id: {
    type: INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自增
  },
  username: {
    type: STRING(100),
    unique: true
  },
  password: STRING(100),
  age: INTEGER,
  last_login_at: DATE
},
  {
    freezeTableName: false,
    timestamps: true
  });
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名


//创建表，默认是false，true则是删除原有表，再创建
Users.sync({ force: false })
// Users.sync({ force: false }).then(function () {
//   // 已创建数据表
//   return Users.create({
//     username: 'test',
//     password: '123456',
//     age: 22
//   });
// });
// sequelize.sync() 同步所有模型到数据库中

module.exports = Users;