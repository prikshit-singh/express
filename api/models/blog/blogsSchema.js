const mongoose = require('mongoose');

var Schema = mongoose.Schema;
// Define the signup schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
    required: true,
  },
  status:{
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
  },
  isdeleted: {
    type: Boolean,
  },
  date: {
    type: String,
    required: true,
  },
  writtenby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },
  catagory: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Blog_catagory'
    }
  ],
  LikedBy: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'User_collection'
    }
  ],
  isvarified: {
    type: String,
  },
  description: {
    type: String,
  },
  Comments: [
    {
      commentText: { type: String, required: true, },
      commentedBy: { type: Schema.Types.ObjectId, ref: 'User_collection' },
      commentDate: {
        type: String,
        required: true,
      },
      commentreplies: [{
        commentText: { type: String },
        commentedBy: { type: Schema.Types.ObjectId, ref: 'User_collection' },
        commentDate: {
          type: String,
        },
      }]
    }
  ]

},{
  strict: false, // Set strict to false to allow changes to the schema
  collection: 'blog_collection', // Specify the collection name (optional)
});

// Create the signup model
const Blog = mongoose.models['Blog_collection'] || mongoose.model('Blog_collection', blogSchema);

module.exports=  Blog;