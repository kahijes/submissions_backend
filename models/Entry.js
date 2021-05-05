
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDb');

    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message);
    })


const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})


phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model("Entry", phonebookSchema)