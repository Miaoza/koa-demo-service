/*
 * @Author: Nianko 
 * @Date: 2020-03-19 20:14:31 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 15:47:17
 */

const Router = require('koa-router');
const router = new Router();

const model = require('../models')
const service = require('../services')
const controller = require('../controllers')
const BaseContext = require('./baseContext')

const methods = ['post', 'get', 'put', 'patch', 'delete']

class MRouter {
  resources(path, Fn) {
    const ctrl = new Fn()
    for (const k of methods) {
      if (!!ctrl[k]) {
        router[k](path, async (ctx) => {
          if (!ctx) {
            ctx = {}
          }
          ctx.model = model
          ctx.service = Object.keys(service).reduce((obj, k) => {
            obj[k] = new service[k](ctx)
            return obj
          }, {})
          ctx.controller = Object.keys(controller).reduce((obj, k) => {
            obj[k] = new controller[k](ctx)
            return obj
          }, {})
          await new Fn(ctx)[k]()
        });
      }
    }
    return router;
  }
}

module.exports = MRouter