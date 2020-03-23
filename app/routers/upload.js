/*
 * @Author: Nianko 
 * @Date: 2020-03-23 10:36:48 
 * @Last Modified by: Nianko
 * @Last Modified time: 2020-03-23 15:20:29
 */

const MRouter = require('../config/baseRouter');
const FileController = require('../controllers/upload')

const mRouter = new MRouter();
const upload = mRouter.resources('/uploads', FileController)

module.exports = upload