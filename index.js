/*
 * @Author: Nianko 
 * @Date: 2020-03-19 14:59:12 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 15:25:18
 */

require("@babel/register");

const Koa = require('koa');
const app = new Koa();
const cors = require("koa2-cors"); /* 跨域必需模块 */
const bodyParser = require("koa-bodyparser"); /* POST请求必需模块 */
const router = require('./app/routers');
const error = require('koa-json-error');
const parameter = require("koa-parameter");
const koajwt = require('koa-jwt');

app.use(error());
// app.use(error({
// 	postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
// }))
app.use(parameter(app));
app.use(cors());
app.use(bodyParser());
app.use(koajwt({
  secret: 'KOADEMOAPP'
}).unless({
  path: [/\/login/]
}));
// app.use(async (ctx) => {
//   ctx.body = 'hello koa2'
// })
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3030)
console.log('[demo] start-quick is starting at port 3030')