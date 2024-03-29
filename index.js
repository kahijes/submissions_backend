
require('dotenv').config()

const express = require('express')
const Entry = require('./models/Entry.js')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('postxd', function (req) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postxd'))


app.get('/api/persons', (request, response) => {

  Entry.find({}).then(entries => {
    response.json(entries)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {        return response.status(404).json({ error: error.message   })
  }

  next(error)
}


app.get('/api/persons/:id', (request, response, next) => {
  Entry.findById(request.params.id).then(entry => {
    if (entry) {
      response.json(entry)
    }
    response.status(404).end()
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',  (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.get('/info', (request, response) => {
  const date = new Date()
  Entry.find({}).then(entries => {
    response.send(`<p>Phonebook has info for ${entries.length} entries</p><p><b>${date}</p>`)
  } )
})


app.post('/api/persons', (request, response, next) => {
  const body  = request.body
  const entry = new Entry({
    name: body.name,
    number: body.number
  })
  entry.save().then(savedEntry => {
    response.json(savedEntry)

  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const entry = {
    number: body.number
  }

  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then(updatedEntry => {
      response.json(updatedEntry)
    }).catch(error => next(error))

})



app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)