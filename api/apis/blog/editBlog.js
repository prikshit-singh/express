const express = require('express')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express()
const Blog = require('../../models/blog/blogsSchema')
const authenticateToken = require('../user/verifyUser')

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file.fieldname', file.fieldname)
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + Date.now() + file.originalname.replace(/ /g, '-'));
  }
  // filename: function(req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  // }
});

var ProductUpload = multer({ storage: productStorage });


const editBlog = app.post('/editblog', ProductUpload.single('BlogImage'), async (req, res) => {
  try {
    const BlogId = req.body.BlogId
    const BlogTitle = req.body.BlogTitle
    const BlogKeywords = req.body.BlogKeywords
    const BlogDescription = req.body.BlogDescription
    const BlogSlug = req.body.BlogSlug
    const oldBlogImage = req.body.oldBlogImage
    const file = req.file
    // const content = req.content

    let oldImageAddress ='uploads/'+oldBlogImage.split('/').reverse()[0]

    let newData = {}
    if (file) {

      fs.unlink(oldImageAddress, (err) => {
        if (err) {
          console.error('Error removing file:', err);
          return;
        }
        console.log('File removed successfully');
      });

      newData = {
        title: BlogTitle,
        keywords: BlogKeywords,
        description: BlogDescription,
        slug:BlogSlug,
        image: `${process.env.BASE_URL}uploads/${file.filename}`,
        // Add other fields as needed
      };

    } else {
      newData = {
        title: BlogTitle,
        keywords: BlogKeywords,
        description: BlogDescription,
        slug:BlogSlug,
      };
    }
    const updatedBlog = await Blog.updateOne(
      { _id: BlogId }, // Filter criteria: find document with the specified ID
      { $set: newData } // Update: set the new name
    );

    if (updatedBlog.nModified === 0) {
      res.status(200).send({ CODE: 400, message: 'No document uploaded' });
      return null;
    }
    res.status(200).json({ CODE: 200, result: updatedBlog })
  } catch (error) {
    console.log(error)
    res.status(200).send({ CODE: 400, message: 'No file uploaded' });
  }



})

module.exports = editBlog