import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const PhoneBook = ({persons, filterName, handleFilterChange, handleDelete}) => {
 // console.log(persons, "phonebook persons")
 // console.log(filterName, "filtername") 
  const filtered = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  console.log(filtered,"filtered")
  return(
    <div>
    <h2>Phonebook</h2>
      <div>
      filter: <input 
          type="text"
          value={filterName}
          onChange={handleFilterChange}
          />
      </div>
      <Persons filtered={filtered} handleDelete={handleDelete}/>
    </div>
  )
}
const Message = ({message, success, errorMessage}) => {
  console.log(message, "message")
  if(message=== null){
    return (<div></div>)
  }
  if(success === true){
    return(
      <div className='success'>{message}</div>
    )
  }
  return(
    <div className='error'>{errorMessage}</div>
  )
}

const Persons = ({filtered, handleDelete}) => {
  return(
    <div>
    <h2>Numbers</h2>
    <ul style={{listStyleType: "none"}}>
      {filtered.map(p => 
        console.log(p, "person") ||
        <li key={p.id}>{p.name} {p.number} <button onClick={() => handleDelete(p.id, p.name)}>Delete</button></li>)}
    </ul>
    </div>
  )

}

const PersonForm = ({ handleSubmit, newName, handleChange, newPhoneNumber, handlePhoneNumber }) => {
  return(
  <div>
  <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
          type="text"
          value={newName}
          onChange={handleChange}
          />
          Phonenumber: <input
          type="text"
          value={newPhoneNumber}
          onChange={handlePhoneNumber}>
          </input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(true)


  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')


  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneNumber = (event) =>{
    setPhoneNumber(event.target.value)
  }
  const handleSubmit = (event) => {
    
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newPhoneNumber
    }
    if (persons.some(e => e.name === newName)){
      if(window.confirm(`${newName} is already in the phonebook`)){
      console.log("painoit ok")
      console.log(persons, "hahahaaha")
      const updatePerson = persons.filter(p => p.name === newName)
      console.log(updatePerson[0].id, "updatePerson")
      setMessage(`Successfully changed ${newName}'s phonenumber`)
        personService
        .update(updatePerson[0].id, noteObject)
        .then(response => console.log(response))
        .catch(error => {
          console.log(error)
          setSuccess(false)
          setErrorMessage(`${newName} is missing from phonebook`)
        })
      }
      console.log("painoit cancel")
    }
    else{
      setMessage(`Added ${newName} succesfully to phonebook`)
      personService
      .create(noteObject)
      .then(response => {
        console.log(response, "create person")
        setPersons(persons.concat(noteObject))
        setNewName('')
        setPhoneNumber('')
      })
    }
  }
  const handleDelete = (props , name) => {
    console.log(props, name)
    if(window.confirm(`Do you really want to remove ${name}`)){
      personService
      .remove(props)
      .then(response => console.log(name, "deleted"))
    }

  }
  return (
    <div>
      <Message message={message} errorMessage={errorMessage} success={success}/>
      <PhoneBook persons={persons} filterName={filterName} handleFilterChange={handleFilterChange} handleDelete={handleDelete}/>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newPhoneNumber={newPhoneNumber} handlePhoneNumber={handlePhoneNumber} />
    </div>
  )
  }


export default App