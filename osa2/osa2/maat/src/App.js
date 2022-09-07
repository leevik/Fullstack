import axios from 'axios'
import {useEffect, useState} from 'react'



/* const Country = (props) =>{
  console.log(props, "Country props")
  return(
    <ul>
      <li>{countries.map(country => country.name.common)}</li>
    </ul> 
  )
} */


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

 const handleChange = (event) => {
    setFilter(event.target.value)
    console.log(event.target.value)
  }

  const handleClick = (props) => {
    console.log(props)
    setFilter(props)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const filtered = countries.filter(f => f.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  
  
  console.log(filtered, "filtered")
  if(filtered.length > 10)
  return(
    <div>
    <form>
      <label>
        Find countries:
        <input type="text" value={filter}onChange={handleChange} />
      </label>
    </form>
    too many countries to show
  </div>
  )
  if(filtered.length===1){
  const flags = Object.values(filtered[0].flags)
  console.log(flags, "flags")
  return(
    <div>
      <form>
        <label>
          Find countries:
          <input type="text" value={filter}onChange={handleChange} />
        </label>
      </form>
      <div><h2>{filtered[0].name.common}</h2></div>
      <ul style={{listStyleType:"none"}}>
        <li>{filtered[0].capital}</li>
        <li>{filtered[0].area}</li>
      </ul>
      <ul>
        languages
        {filtered.map(e => <div>{Object.values(e.languages).map(language => <li key={language}>{language}</li>)}</div>)}
      </ul>
       <img src={flags[0]} alt={'flag of the filtered country'}></img>
    </div>
  )
  }
  return (
    <div>
      <form>
        <label>
          Find countries:
          <input type="text" value={filter}onChange={handleChange} />
        </label>
      </form>
      <ul style={{listStyleType:"none"}}>
      {filtered.map(f =>  <li key={f.name.common}>{f.name.common}<button onClick={() =>handleClick(f.name.common)}>show</button></li>)}
      </ul>
    </div>
  )
}

export default App
