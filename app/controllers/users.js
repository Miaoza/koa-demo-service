/*
 * @Author: Nianko 
 * @Date: 2020-03-19 16:52:00 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 15:24:21
 */

const base = require('../config/baseContext')

class UsersController extends base.Controller {
  async get() {
    const users = await this.ctx.service.users.findAll();
    this.ctx.body = { code: 0, data: users }
  }
  async post() {
    const user = await this.ctx.service.users.create();
    console.log('controller:', user)
    this.ctx.body = { code: 0, data: user }
  }
}

module.exports = UsersController