/*
 * @Author: Nianko 
 * @Date: 2020-03-23 10:25:13 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-23 14:23:03
 */

const base = require('../config/baseContext');
const fs = require('fs');
const path = require('path');

class FileController extends base.Controller {
  async post() {
    const { ctx } = this
    const file = ctx.request.files.file; // 获取上传文件
    const fileDir = 'uploads'
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
    let remotefilePath = `/api/v1/uploads` + `/${fileName}`;
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
  async get() {
    const user = await this.ctx.service.users.findById();
    console.log('controller:', user)
    this.ctx.body = { code: 0, data: user }
  }
}

module.exports = FileController
