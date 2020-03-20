/*
 * @Author: Nianko 
 * @Date: 2020-03-19 16:40:52 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 15:48:27
 */

const MRouter = require('../config/baseRouter');
const UsersController = require('../controllers/users');
const LoginController = require('../controllers/login');
const UserController = require('../controllers/user');

const mRouter = new MRouter();
// const resource = new UsersController();
// router.post('/users', resource.list())
const users = mRouter.resources('/users', UsersController)
// router.get('/', async (ctx) => {
//   ctx.body = new UsersController(ctx).list()
// });
const login = mRouter.resources('/login', LoginController)
const user = mRouter.resources('/users/:id', UserController)
module.exports = { users, login, user }