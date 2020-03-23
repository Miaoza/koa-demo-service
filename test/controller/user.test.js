/*
 * @Author: Nianko 
 * @Date: 2020-03-20 17:51:44 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-23 09:23:37
 */

const supertest = require('supertest')
const chai = require('chai')
const app = require('../../index')
const expect = chai.expect
const request = supertest(app.listen())