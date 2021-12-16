import React from "react"

const Header = ({ course }) => {
  return (
    <div>
    <h1>{course.name}</h1>
    </div>
  )
}

const Total = ({ course }) => {
  const result = course.parts.map(part => part.exercises);
  const sum = result.reduce((accumulator, currentValue) => accumulator + currentValue);
  return(
    <p>Total of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
   props.part.parts.map(part => 
    <ul key={part.id}>
    {part.name} {part.exercises}
    </ul>
   ))
}

const Content = ({ course }) => {
  return (
    <div>
    <Part part={course}/>
    </div>
  )
}
const Course = ({course}) => {
  return (
    <div>
      <Header course={course[0]} />
      <Content course={course[0]} />
      <Total course={course[0]} />
      <Header course={course[1]} />
      <Content course={course[1]} />
      <Total course={course[1]} />
    </div> 
  )
}

  export default Course