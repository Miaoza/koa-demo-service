/*
 * @Author: Nianko 
 * @Date: 2020-03-19 16:52:29 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 16:09:34
 */

const base = require('../config/baseContext')
const helper = require('../extend/helper')

function formateUserField(user) {
  return {
    id: user.id,
    username: user.username,
    age: user.age,
    lastLoginAt: user.last_login_at
  }
}

class UsersService extends base.Service {
  async findAll() {
    const { ctx } = this
    const limit = +ctx.query.pageSize || 0
    const offset = ((+ctx.query.pageNum - 1) || 0) * limit
    const users = await ctx.model.Users.findAndCountAll({ limit, offset })
    console.log(limit, ':', offset)
    return { count: users.count, list: users.rows.map(item => formateUserField(item)) }
  }
  async findById() {
    const { ctx } = this
    const userId = ctx.params.id || 0;
    console.log('userId:', userId)
    const user = await ctx.model.Users.findByPk(userId);
    if (user) {
      return formateUserField(user)
    }
    ctx.throw(404, '找不到该用户')
  }
  async create() {
    const { ctx } = this
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      age: { type: 'number', required: false }
    })
    const { username, password, age } = ctx.request.body
    const user = await ctx.model.Users.create({
      username,
      password: helper.getHashPwd(password),
      age
    })
    return formateUserField(user)
  }
  async updatePwd() {
    const { ctx } = this
    const id = ctx.params.id || 0;
    const pwd = ctx.request.body.password
    return await ctx.model.Users.update({ password: helper.getHashPwd(pwd) }, { id })
  }
  async updateUser() {
    const { ctx } = this
    const id = ctx.params.id || 0;
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      age: { type: num, required: false }
    })
    const { username, password, age } = ctx.request.body
    const hashPwd = helper.getHashPwd(password)
    return await ctx.model.Users.update({ username, password: hashPwd, age }, { id })
  }
  async deleteById() {
    const { ctx } = this
    const id = ctx.params.id || 0;
    return await ctx.model.Users.destroy({ id })
  }
  async updateLoginTime(id) {
    const { ctx } = this;
    const user = await ctx.model.Users.findByPk(id);
    return await user.update({ last_login_at: new Date() });
  }
  async login() {
    const { ctx } = this
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    const { username, password } = ctx.request.body
    const data = { username, password: helper.getHashPwd(password) }
    const user = await ctx.model.Users.findOne(data)
    if (user) {
      this.updateLoginTime(user.id)
      return helper.loginToken({ id: user.id, username })
    }
    throw (404, '用户不存在')
  }
}

module.exports = UsersService