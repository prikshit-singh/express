const express = require('express')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express()
const Blog = require('../../models/blog/blogsSchema')
const authenticateToken = require('../user/verifyUser')


const moveToBin = app.post('/movetobin', async (req, res) => {
    try {
        const BlogId = req.body.BlogId


        console.log(BlogId)
        const newData = {isdeleted:true}

        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: BlogId }, // Filter criteria: find document with the specified ID
            { $set: newData }, // Update: set the new data for the specified fields
            { upsert: true, new: true } // Options: create new document if not exists and return the updated document
        );
       
        console.log(updatedBlog)

        if (updatedBlog.nModified === 0) {
            res.status(200).send({ CODE: 400, message: 'No document uploaded' });
            return null;
        }
        res.status(200).json({ CODE: 200, result: updatedBlog })
    } catch (error) {
        res.status(200).send({ CODE: 400, message: 'No file uploaded' });
    }



})

module.exports = moveToBin