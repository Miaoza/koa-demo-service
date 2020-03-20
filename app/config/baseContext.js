/*
 * @Author: Nianko 
 * @Date: 2020-03-19 17:58:40 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 10:36:29
 */

class BaseContext {
  constructor(ctx) {
    this.ctx = ctx || {}
  }
}


class Controller extends BaseContext {
}
class Service extends BaseContext {
}


module.exports = {
  Controller,
  Service
}