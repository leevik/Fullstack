const mongoose = require('mongoose')

/* if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} */
/* mongodb+srv://botlsj:<password>@cluster0.cyo6hfk.mongodb.net/?retryWrites=true&w=majority */
//const password = process.argv[2]
/* 59yWwZcsFdcISIqc */
const url =
  `mongodb+srv://botlsj:59yWwZcsFdcISIqc@cluster0.cyo6hfk.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Pittsburgh Penguins Stanley cup 2022-2023',
  date: new Date(),
  important: true,
})

/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */
Note.find({}).then(result  => {
    console.log("haha",result, "haha") || result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })