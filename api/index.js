require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/dbconfig/dbconfig')
const app = express()
const createBlog = require('./apis/blog/createBlog')
const updateBlogContent = require('./apis/blog/updateBlogContent')
const getAllBlogs = require('./apis/blog/getAllBlogs')
const getBlogWithId = require('./apis/blog/getBlogWithId')
const editBlog = require('./apis/blog/editBlog')
const postblog = require('./apis/blog/postblog')

app.use(express.static('./files'));
app.use(express.static('./uploads'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
connectDB()


app.get('/',  async (req, res) => {
  res.status(200).json({ CODE: 200, result: 'success' })

})

app.listen(4002, function () {
  console.log('Https App started 4002');
});
