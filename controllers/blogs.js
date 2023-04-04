const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
      response.json(blogs)
    })
/* blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        console.log("haha")
        response.json(blogs)
      })
  }) */
  
  blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog.save().then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })
  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })


module.exports = blogsRouter

/* app.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }) */