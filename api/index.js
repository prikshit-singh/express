require('dotenv').config();
const express = require('express')
//const cors = require('cors')

const connectDB = require('./config/dbconfig/dbconfig')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

app.use(express.static('./files'));
app.use(express.static('./uploads'));
//app.use(cors())
// app.use(express.json());
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
