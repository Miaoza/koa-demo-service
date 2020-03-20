/*
 * @Author: Nianko 
 * @Date: 2020-03-20 11:50:34 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 14:13:03
 */

const base = require('../config/baseContext')

class LoginController extends base.Controller {
  async post() {
    const user = await this.ctx.service.users.login();
    console.log('controller:', user)
    this.ctx.body = { code: 0, data: user }
  }
}

module.exports = LoginController