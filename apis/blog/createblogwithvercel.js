const express = require('express')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express()
const Blog = require('../../models/blog/blogsSchema')
const authenticateToken = require('../user/verifyUser')




const createblogwithvercel = app.post('/createblogwithvercel',  async (req, res) => {
  try {
    const BlogTitle = req.body.BlogTitle
    const BlogKeywords = req.body.BlogKeywords
    const BlogDescription = req.body.BlogDescription
    const BlogSlug = req.body.BlogSlug
    const file = req.BlogImage
    
      const textContent = ''
  
      const textdirPath = path.join(process.cwd(), 'files');


      if (!fs.existsSync(textdirPath)) {
        fs.mkdirSync(textdirPath, { recursive: true });
      }

      const fileName = Date.now()
  
      const blogfilePath = path.join(textdirPath, `${fileName}.txt`);


      fs.writeFileSync(blogfilePath, textContent);
  
  
      const blog = await new Blog({
        title: BlogTitle,
        subtitle: BlogTitle,
        slug: BlogSlug,
        keywords: BlogKeywords,
        status: '0',
        content: `${process.env.BASE_URL}${fileName}.txt`,
        image: file,
        date: '20-2-2024',
        writtenby: '6526c193ebd98eb11abd7f00',
        catagory: [],
        LikedBy: [],
        isvarified: 'false',
        description: BlogDescription,
        Comments: [],
      });
      const result = await blog.save()
  
  
      res.status(200).json({ CODE: 200, result })
  
  } catch (error) {
    res.status(200).send({CODE:400 ,message:'No file uploaded'});
  }

 

})

module.exports = createBlog
