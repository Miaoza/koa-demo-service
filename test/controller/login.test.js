/*
 * @Author: Nianko 
 * @Date: 2020-03-20 17:51:55 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-23 10:01:37
 */

const supertest = require('supertest')
const chai = require('chai')
const app = require('../../index')
const expect = chai.expect
const request = supertest(app.listen())

// 测试套件/组
describe('开始测试demo的GET请求', () => {
  // 测试用例
  it('测试/login请求', (done) => {
    const data = {
      username: "testUser",
      password: "123456"
    }
    request
      .post('/api/v1/login')
      .send(data)  // send a json data
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an('object');
        expect(res.body.code).to.be.equal(0);
        expect(res.body.data).to.be.an('string');
        done()
      })
  })
})