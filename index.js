require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const mongoose = require('mongoose')
const { response } = require('express')

morgan.token('responsed', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :responsed'
  )
)

app.get('/', (req, res) => {
  res.send('hello there')
})

app.get('/info', (req, res) => {
  const dateObj = new Date()
  const present = dateObj.toDateString()
  const dooku = dateObj.toTimeString()
  Person.count({})
    .then(p => res.send(`<p>Phonebook has info for ${p} people <br/>
  <br/>
  ${present} ${dooku} </p>`))
  console.log(present)
  console.log(dooku)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = Math.floor(Math.random() * 1000)
  return maxId
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const target = Person.find({}).then(persons => persons.filter(p => p.name ===body.name)).then(result => {
    try{
      if (!body.number && !body.name) {
        const e = new Error('name and number missing')
        e.name = 'nameNumber'
        throw e
      }
      else if (!body.name) {
        const e = new Error('name is missing')
        e.name = 'name'
        throw e
      }
      else if (target.length > 0) {
        const e = new Error('name is already in the phonebook')
        e.name = 'already'
        throw e
      }
      else if (!body.number) {
        const e = new Error('number is missing')
        e.name = 'number'
        throw e
      }
      else{
        const person = new Person({
          name: body.name,
          number: body.number,
          date: new Date(),
          id: generateId(),
        })
        person.save().then((savedPerson) => {
          response.json(savedPerson)
        }).catch(error => next(error))
      }
    }catch(error){next(error)}
  })
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(request.body, 'request-body')
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }
  if (!body.number) {
    body.number =100
  }
  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }
  Person.findByIdAndUpdate(request.params.id, person,{ new:true, runValidators:true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})



const errorHandler = (err, req, res, next) => {
  if(err.name === 'CastError'){
    return res.status(400).send({ err: 'malformatted id' })
  }
  if(err.name === 'nameNumber'){
    return res.status(400).send({ err: 'name and number missing' })
  }
  if(err.name === 'name'){
    return res.status(400).send({ err: 'name missing' })
  }
  if(err.name === 'number'){
    return res.status(400).send({ err: 'number missing' })
  }
  if(err.name === 'already'){
    return res.status(400).send({ err: 'name already in the phonebook' })
  }
  if(err.name === 'ValidationError'){
    return res.status(400).send({ err: `${err}` })
  }
  else{
    return res.status(500).send({ err:err })
  }
}
app.use(errorHandler)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

console.log()
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
