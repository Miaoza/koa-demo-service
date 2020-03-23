/*
 * @Author: Nianko 
 * @Date: 2020-03-23 10:25:13 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-23 15:33:29
 */

const base = require('../config/baseContext');
const fs = require('fs');
const path = require('path');

class FileController extends base.Controller {
  async post() {
    const { ctx } = this
    const file = ctx.request.files.file; // 获取上传文件
    const fileDir = 'public/uploads'
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, err => {
        console.log('创建失败', err)
        return
      });
    }
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let tail = file.name == 'blob' ? 'png' : file.name.split('.').pop()
    const fileName = new Date().getTime() + '.' + tail
    let filePath = path.join(fileDir, fileName);
    let remotefilePath = `/uploads` + `/${fileName}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = {
      url: remotefilePath,
      message: "文件上传成功",
      code: 0
    }
  }
  // async get() {
  //   // this.ctx.response.set('X-Response-Time');
  //   const filename = this.ctx.params.filename
  //   const filePath = path.join('public/uploads', filename);
  //   const content = fs.readFileSync(filePath, "binary");
  //   // const content = fs.createReadStream(filePath);
  //   // const buffer = new Buffer(content);
  //   // const user = await this.ctx.service.users.findById();
  //   console.log('controller:', content)
  //   this.ctx.body = content
  // }
}

module.exports = FileController
