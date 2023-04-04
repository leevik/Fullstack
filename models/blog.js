const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = mongoose.model("Blog", blogSchema)