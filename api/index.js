require('dotenv').config();
const express = require('express')

const connectDB = require('./config/dbconfig/dbconfig')
const app = express()
connectDB()


app.get('/',  async (req, res) => {
  res.status(200).json({ CODE: 200, result: 'success' })

})

app.listen(4002, function () {
  console.log('Https App started 4002');
});
