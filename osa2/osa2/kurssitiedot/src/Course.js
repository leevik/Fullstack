
export const Course = ({courses}) => {
    console.log(courses, "course props")
    return(
    <div>
      
      {courses.map(course => console.log(course, "course") ||
      <ul style={{listStyle:"none"}}>
        <Header key={course.id} course={course}/>
        <Content key={course.id} parts={course.parts}/>
        </ul>
      )}
    
    </div>
    )
  }
  const Header = ({course}) => {
    console.log(course, "header props")
    return(
    <h1>{course.name}</h1>
    )
  }

   
  const Content =  ({parts}) => {
    console.log(parts, "content propsit")

    const total = parts.map(exe => exe.exercises)
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalExercices = total.reduce(reducer);

    return(
        <li>
        {parts.map(part => 
            <Part key={part.id} part={part}/>
        )}
          <li> total of {totalExercices} exercises</li>
        </li>
    )
  }
  const Part = ({part}) => {
    console.log(part, "parts props")
    return(
      <li>
        {part.name} {part.exercises}
      </li>
    )
    }
