const express = require('express')
const authenticateToken = require('../user/verifyUser')

const app = express()
const Blog = require('../../models/blog/blogsSchema')


const getAllBlogs = app.get('/getallblogs', authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ $or: [{ isdeleted: { $exists: false } }, { isdeleted: { $ne: true } }] });
    res.status(200).json({ CODE: 200, result: blogs });


  } catch (error) {
    res.status(200).send({ CODE: 400, message: 'something went wrong' });
  }

})

module.exports = getAllBlogs