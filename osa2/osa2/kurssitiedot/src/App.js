
import { useEffect, useState } from 'react'
import noteService from './services/notes'

const Notes = (props) => {
  console.log(props, "notes props")
  const label = props.note.important ? 'make not important' : 'make important'
  return (
    <li className='note'>
        {props.note.content}
        <button onClick={props.toggleImportance}>{label}</button>
    </li>
  )
  }

const Notification = ({message, success, successMessage}) => {
  console.log(message)
  if(message ===null){
    return null 
  }
  if(success ===true){
    return (
      <div className='success'>{successMessage}</div>
    )
  }

  return (
    <div className='error'>{message}</div>
  )
}
  const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(true)
    console.log(notes, "notes")
    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const showDecider = () => setShowAll(!showAll)
    const label = showAll ? 'show important only' : 'show all'

    /* const addNote = (event) => {
      event.preventDefault()
      console.log("button clicked", event.target)
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
      }
      axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response, "response")
      })
      setNotes(notes.concat(noteObject))
      setNewNote('')
      
    } */
   /*  const toggleImportanceOf = (id) => {
      console.log(id, "id")
     const oikea= notes.filter(note => note.id === id)
      console.log(oikea, "oikea note")
      oikea[0].important = !oikea[0].important
    } */
   /*  const toggleImportanceOf = id => {
      const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
    
      axios.put(url, changedNote).then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
    } */
    /* const toggleImportanceOf = id => {
      const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
    
      axios.put(url, changedNote).then(response =>  {
        console.log(response, "response") ||
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
    } */
    const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5
      }
      
      noteService
        .create(noteObject)
        .then(response => {
          console.log(response)
          setNotes(notes.concat(response))
          setNewNote('')
        })
      }

    useEffect(() =>{
      noteService
      .getAll()
      .then(response =>{
        console.log(response, "getAll response")
        setNotes(response)
      })
    }, [])

    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }
    const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote)
        .then(response => {
          setNotes(notes.map(note => note.id !== id ? note : response))
          setMessage(`Course "${note.content}" importancy was changed`)
        })
        .catch(error => {
          setSuccess(false)
          setErrorMessage(
          `Note "${note.content}" was already removed from server`
          )
          setTimeout(()=> {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }
  
    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} successMessage={message} success={success}/>
        <ul style={{listStyleType: "none"}}>
          {notesToShow.map(note => 
            <Notes 
            key={note.id} 
            note={note}
            toggleImportance={()=> toggleImportanceOf(note.id)}
            />)} 
        </ul>
        <button onClick={showDecider}>{label}</button>
        <form onSubmit={addNote}>
          <input
           value={newNote}
           onChange={handleNoteChange} />
          <button type='submit'>save</button>
        </form>
      </div>
    )
  }
  

  /* const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ] */

/* const App = (props) => {
 
  return (
    <div>
      <Course courses={courses}/>
    </div>
  )
} */

export default App