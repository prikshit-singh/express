const express = require('express')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express()
const Blog = require('../../models/blog/blogsSchema')
const authenticateToken = require('../user/verifyUser')



const updateBlogContent = app.post('/updateblogcontent', authenticateToken, async (req, res) => {
  try {

    const fileName = req.body.fileName;
    const textContent = req.body.textContent;

    console.log(textContent)
    // const fileName = req.body.fileName

    // const textContent = req.body.textContent

    // // // upload file
    // // const textContent = ''

    // console.log('fileName',fileName)
    // console.log('textContent',textContent)

    const textdirPath = path.join(process.cwd(), 'files');
    const blogfilePath = path.join(textdirPath, `${fileName}`);
    fs.writeFileSync(blogfilePath, textContent);

    res.status(200).json({ CODE: 200, result: 'success' })

  } catch (error) {
    res.status(200).send({ CODE: 400, message: 'No file uploaded' });
  }



})

module.exports = updateBlogContent