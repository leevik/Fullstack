const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan("tiny")



let persons = [
        {
          "name": "Arto Hellas",
          "number": "123123123",
          "id": 1
        },
        {
          "name": "Ada Lovelace",
          "number": "39-44-5323523",
          "id": 2
        },
        {
          "name": "Dan Abramov",
          "number": "4353453",
          "id": 3
        },
        {
          "name": "Mary Poppendick",
          "number": "23232325555",
          "id": 4
        }
] 
morgan.token("responsed", function(req, res) {
  return(JSON.stringify(req.body))
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :responsed"))
/* morgan.token("responsed", function(req, res) {
  return(JSON.stringify(persons))
 
  //res.json(persons)
})


app.use(morgan(":method :url :status :res[content-length] - :response-time ms :responsed")) */
/* const requestLogger = (request, response, next) => {
  console.log('Method:', response.method)
  console.log('Path:  ', response.path)
  console.log('Body:  ', response.body)
  console.log('---')
  next()
}
app.use(requestLogger) */

app.get('/', (req, res) => {
    res.send("hello there")
    
  })
  

  app.get('/info', (req, res) => {
    const personNumber = persons.length
    const dateObj = new Date()
    const present = dateObj.toDateString()
    const dooku = dateObj.toTimeString()
    console.log(present)
    console.log(dooku)
    res.send(`<p>Phonebook has info for ${personNumber} people <br/>
        <br/>
        ${present} ${dooku} </p>`
    )
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    //const note = notes.find(note => note.id === id)
    const person = persons.find(p => {
      console.log(p.id, typeof p.id, id, typeof id, p.id === id)
      return p.id === id
    })
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
  })
  
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })
  
  /* const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  } */
  const generateId = () => {
    const maxId = Math.floor(Math.random() * 1000);
    return maxId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const find = persons.filter(person => person.name === body.name)
    
    
    console.log("find", find)
    if (!body.name ) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
     if (find.length > 0) {
      return response.status(400).json({ 
        error: `${body.name} already in the phonebook`
      })
    } 
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      date: new Date(),
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
    
    
    