const mongoose = require('mongoose');

var Schema = mongoose.Schema;
// Define the signup schema
const catagorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },

},{
  strict: false, // Set strict to false to allow changes to the schema
  collection: 'blog_catagory', // Specify the collection name (optional)
});

// Create the signup model
const Blog_catagory = mongoose.models['Blog_catagory'] || mongoose.model('Blog_catagory', catagorySchema);

module.exports=  Blog_catagory;
