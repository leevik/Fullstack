import React, { useState } from 'react'
import ReactDOM, { render } from 'react-dom'



const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text} </button>;
};

const App = (props) => {
  let [selected, setSelected] = useState(0);
  let [items, setItems] = useState([0,0,0,0,0,0]);
  let [vote, setVote] = useState(0);
  let show = [Math.floor(Math.random() * (1,6))];
  let copy = [...items];
  const indexOfmaxValue = items.indexOf(Math.max(...items));
  console.log(indexOfmaxValue);

  console.log(items);

  const randomAnecdote = () => {
    setSelected(selected = show)
  };

 const voteThisAnecdote = () =>{
    copy[selected]+=1;
    setItems(copy);
    setVote(vote+=1); 
    
 }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
  <p>{items[selected]}</p>
        <div>
        </div>
        <Button handleClick={randomAnecdote} text ="next"/>
      <Button handleClick={voteThisAnecdote} text ="vote"/>
        <h1>Anecdote with most votes</h1>
     <p>{props.anecdotes[indexOfmaxValue]}</p> 
     <p>has {Math.max(...items)} votes</p>
      </div>
    </div>
  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));