const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const logger = require("../utils/logger")
require("express-async-errors")
const Blog = require('../models/note')


/* beforeEach(async () => {

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
  console.log("done")
}) */


test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('dummy returns one', async () => {
  let result = await api
  .get("/api/blogs")
  console.log("resultti = " + JSON.stringify(result.body))
  //console.log(result.body)
  let testi1 = result.body.map(r => r._id)
  console.log("testi1 " + testi1)
  expect(testi1).toBeDefined()
})

/* describe('likes', () => {
    test('blogs likes combined', () => {
        const result = listHelper.totalLikes(blogs)
      expect(result).toBeGreaterThan(10)
    })
}
) */
/* describe(' Most liked blog', () => {
  test('Most liked blog', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(result)
  })
}
) */
/* describe(' Most blogs', () => {
  test('Most blogs by person', () => {
      const result = listHelper.mostBlogs(blogs)
      console.log("resultti" + JSON.stringify(result))
      expect(result).toEqual(result)
  })
}
) */
/* describe(' Most likes', () => {
  test('Most likes by person', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual(result)
  })
}
) */
test('blog post can be added', async () => {
  const blogsAtBeginning = await helper.blogsInDb()
  let testAmount = blogsAtBeginning.length;
  console.log("hulabaloobalai: " + testAmount)

  const newBlog = {
    title: "haha",
    author: "Leevi",
    url: "www.reeniasdas.fi",
    likes: null
  }
  if(newBlog.likes===null){
    newBlog.likes=0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


   const blogsAtEnd = await helper.blogsInDb()
   console.log("at end: " +blogsAtEnd.length)
  expect(blogsAtEnd).toHaveLength(testAmount + 1)
  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain(
    'haha'
  )  
}
)

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log("blogToDelete: " + blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length-1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})