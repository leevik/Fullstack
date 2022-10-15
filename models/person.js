const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
     validate: {
      validator: function(v){
        const re = /^\d\d-[0-9]*/
        const re1 = /^\d\d\d-[0-9]*/
        let condition = (re.test(v) || re1.test(v)) ? true: false;
        console.log(re1.test(v), "testi re1")
        console.log(re.test(v), "testi re")
        console.log(condition)
        return condition;
      },
      message: props => `${props.value} is not valid phonenumber`
    }, 
    minlength:8,
    required: true
  },
  date: Date,
  important: Boolean,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)