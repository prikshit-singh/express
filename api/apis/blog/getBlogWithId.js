const express = require('express')
const authenticateToken = require('../user/verifyUser')

const app = express()
const Blog = require('../../models/blog/blogsSchema')
  

const getAllBlogs = app.get('/getblogwithid',authenticateToken, async (req, res) => {
  try{
    const id = req.headers['id'];
    console.log(id)
    const blogs =await Blog.findOne({_id:id})
    res.status(200).json({CODE:200, result:blogs })

  }catch (error) {
    res.status(200).send({CODE:400 ,message:'No file uploaded'});
  }
   
  })

  module.exports = getAllBlogs