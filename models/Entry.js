
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI



mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDb')

  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })


const phonebookSchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  number: { type: String, require: true }
})

phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Entry', phonebookSchema)