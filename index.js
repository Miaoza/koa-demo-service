/*
 * @Author: Nianko 
 * @Date: 2020-03-19 14:59:12 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-23 10:42:03
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
const koaBody = require('koa-body'); //解析上传文件的插件

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));

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
  path: [/\/login/, /\/uploads/]
}));
// app.use(async (ctx) => {
//   ctx.body = 'hello koa2'
// })
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
module.exports = app

app.listen(3030)
console.log('[demo] start-quick is starting at port 3030')
