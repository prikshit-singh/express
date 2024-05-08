require('dotenv').config();
const express = require('express')
const cors = require('cors')

const connectDB = require('./config/dbconfig/dbconfig')
const app = express()
const bodyParser = require('body-parser');


const createBlog = require('../apis/blog/createBlog')
const updateBlogContent = require('../apis/blog/updateBlogContent')
const getAllBlogs = require('../apis/blog/getAllBlogs')
const getBlogWithId = require('../apis/blog/getBlogWithId')
const editBlog = require('../apis/blog/editBlog')
const postblog = require('../apis/blog/postblog')

const path = require('path');
const fs = require('fs');
const createAdmin = require('../apis/user/createUser')
const login = require('../apis/user/login')
const authenticateToken = require('../apis/user/verifyUser')

// const img = require('../../next_project/next_project/public')
// app.use(express.static('../../next_project/next_project/public'));
app.use(express.static('./files'));
app.use(express.static('./uploads'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
connectDB()

// const root = require('path').join(__dirname,  'build');

// app.use(express.static(root));


app.use(createBlog)
app.use(updateBlogContent)
app.use(editBlog)
app.use(postblog)
app.use(getAllBlogs)
app.use(getBlogWithId)



app.use(createAdmin)
app.use(login)



app.get('/',  async (req, res) => {
  res.status(200).json({ CODE: 200, result: 'success' })

})

app.get('/files', (req, res) => {
  const filename = req.headers.filename;
  const filePath = path.join(process.cwd(), `files/${filename}`)


  if (fs.existsSync(filePath)) {


    const data = fs.readFile(filePath, (err, data) => {
        console.log(data)
        const data1 = {CODE:200,data:data}
        res.send(data1)
     })
  } else {
     console.log(error)
    res.status(200).json({ CODE: 200, data:'file not found'});
  }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(root, 'index.html'));
// });

app.listen(4002, function () {
  console.log('Https App started 4002');
});
