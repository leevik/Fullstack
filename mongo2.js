const mongoose = require('mongoose')



const password = process.argv[2]
/* 59yWwZcsFdcISIqc */
const url =
  `mongodb+srv://botlsj:${password}@cluster0.cyo6hfk.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  date: new Date(),
  important: true,
})
console.log("argumentti 0",process.argv[2])
console.log("argumentti 1",process.argv[3])
console.log("argumentti 2",process.argv[4])

if (process.argv.length<4) {
    Person.find({}).then(result  => {
        console.log("phonebook:")
        result.forEach(note => {
          console.log(note.name, note.number)
        })
    mongoose.connection.close()
    process.exit(1)
    })
}
else{
person.save().then(result => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})
}
/* Person.find({}).then(result  => {
    console.log("haha",result, "haha") || result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  }) */