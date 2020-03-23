/*
 * @Author: Nianko 
 * @Date: 2020-03-19 16:40:55 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-23 10:38:33
 */

const Router = require('koa-router')
const users = require('./user').users
const login = require('./user').login
const user = require('./user').user
const upload = require('./upload')

const router = new Router({
  prefix: '/api/v1'
})

router.use(users.routes(), users.allowedMethods())
router.use(user.routes(), user.allowedMethods())
router.use(login.routes(), login.allowedMethods())
router.use(upload.routes(), upload.allowedMethods())
module.exports = router