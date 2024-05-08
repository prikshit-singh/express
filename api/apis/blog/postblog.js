const express = require('express')
const app = express()
const Blog = require('../../models/blog/blogsSchema')


const postblog = app.post('/postblog', async (req, res) => {
    try {
        const BlogId = req.body.BlogId
        const isvarified = req.body.isvarified
  
        // const content = req.content
       const newData = {
            isvarified: isvarified,
        };

        const updatedBlog = await Blog.updateOne(
            { _id: BlogId }, // Filter criteria: find document with the specified ID
            { $set: newData } // Update: set the new name
        );

        if (updatedBlog.nModified === 0) {
            res.status(200).send({ CODE: 400, message: 'Blog not Online' });
            return null;
        }
        res.status(200).json({ CODE: 200, result: updatedBlog })
    } catch (error) {
        console.log(error)
        res.status(200).send({ CODE: 400, message: 'No Blog Uploaded' });
    }



})

module.exports = postblog