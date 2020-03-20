/*
 * @Author: Nianko
 * @Date: 2020-03-18 11:02:06
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-20 15:26:09
 */

'use strict';

const jwt = require('jsonwebtoken'); // 引入jsonwebtoken
const crypto = require('crypto');

// 密钥
const secret = 'KOADEMOAPP';

module.exports = {
  getInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
  loginToken(data, expires = 7200) {
    const exp = Math.floor(Date.now() / 1000) + expires;
    const token = jwt.sign({ data }, secret, { expiresIn: exp });
    return token;
  },
  verifyToken(token) {
    let res = false;
    try {
      const result = jwt.verify(token, secret) || {};
      const { exp = 0 } = result;
      const current = Math.floor(Date.now() / 1000);
      res = current <= exp && !!result.data;
    } catch (e) {
      throw e;
    }
    return res;
  },
  getUser(token) {
    const result = jwt.verify(token, secret) || {};
    return result.data;
  },
  // 密码加密
  getHashPwd(password) {
    const md5 = crypto.createHash('md5');
    const sha1 = crypto.createHash('sha1');
    md5.update(password);
    const md5Pwd = md5.digest('hex');
    sha1.update(md5Pwd);
    const sha1Pwd = sha1.digest('hex');
    return sha1Pwd;
  }
};
