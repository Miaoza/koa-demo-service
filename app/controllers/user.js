/*
 * @Author: Nianko 
 * @Date: 2020-03-20 15:41:15 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 15:51:31
 */

const base = require('../config/baseContext')

class UserController extends base.Controller {
  async get() {
    const user = await this.ctx.service.users.findById();
    console.log('controller:', user)
    this.ctx.body = { code: 0, data: user }
  }
}

module.exports = UserController