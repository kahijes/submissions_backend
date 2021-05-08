const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://kahijess:${password}@dbhy.awxt6.mongodb.net/phonebook-db?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})



const Entry = mongoose.model('Entry', phonebookSchema)


const entry = new Entry({
  name: name,
  number: number,
})

if (process.argv.length < 4) {
  console.log('phonebook')
  Entry.find({}).then(result => {
    result.forEach(entry => {
      console.log(entry.name, entry.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

entry.save().then(() => {
  console.log(`added ${name} number ${number} to the phonebook`)
  mongoose.connection.close()
})
