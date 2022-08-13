import React from 'react';
import ReactDOM from 'react-dom';

  const Total = (props) => {
    console.log("total",props);
     return ( 
        <div>
            <p>Number of exercises {props.course.parts[0].exercises+props.course.parts[1].exercises+props.course.parts[2].exercises} </p>
        </div>
    )
}
const Part = (props) => {
  console.log("part",props);
  return (
    <div>
      <p>{props.text}, {props.text2} </p>
    </div>
  )
}

const Header = (props) => {
  console.log("header",props);
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  console.log("content",props);
  return (
      <div>
        <Part text={props.course.parts[0].name} text2={props.course.parts[0].exercises} />
        <Part text={props.course.parts[1].name} text2={props.course.parts[1].exercises}/>
        <Part text={props.course.parts[2].name} text2={props.course.parts[2].exercises}/>
      </div>
   )
}
  const App = () => {
    const course = {
      name: "Half Stack application development",
      parts: [
    {
     name: "Fundamentals of React",
     exercises: 10
    },
     {
      name: "Using props to pass data",
      exercises: 7
    },
    {
        name: "State of component",
        exercises: 14
    }
  ]
}
    return ( 
      <div>
      <Header courseName={course.name}/>
      <Content course={course}/>
       <Total course={course}/>
      </div>
    )
  }

 

ReactDOM.render( <App />, document.getElementById('root')
);
