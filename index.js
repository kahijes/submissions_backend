const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let phonebook = [
    {id: 1,
    name: "Arto Hellas",
    number: "040-123"
    }
]

// app.get('/', (request, response) => {
//     response.send('<h1>Hello world!</h1>')
// })

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(entry => entry.id === id)

    if (!person) {
        response.status(404).end()
    }
    response.json(person)
})

app.delete('/api/persons/:id',  (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(entry => entry.id !== id)

    response.status(204).end()
})


app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${phonebook.length} entries</p><p><b>${date}</p>`)
})

const generateId = () => {
    return Math.floor(Math.random()*1000)
}

app.post('/api/persons', (request, response) => {
    const body  = request.body

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (phonebook.find(entry => entry.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    phonebook = phonebook.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);