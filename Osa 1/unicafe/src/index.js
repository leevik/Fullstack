import React, { useState } from 'react'
import ReactDOM, { render } from 'react-dom'


const Statistics = (props) => {
  console.log(props);
  if (props.counter3 === 0) {
    return <h2>No feedback given</h2>;
  }
  return (
    <table>
      <tbody>
     <tr>
       <td>{props.text}</td>
       <td>{props.counter}</td>
       </tr>
      <tr>
      <td>{props.text1}</td>
      <td>{props.counter1}</td>
      </tr>
       <tr>
       <td>{props.text2}</td>
       <td>{props.counter2}</td>
       </tr> 
      <tr>
      <td>{props.text3}</td>
      <td>{props.counter3}</td>
      </tr>
      </tbody>
    </table>
  );
};
const StatisticsLine = (props) => {
  console.log(props);
  if (props.all === 0) {
    return "";
  }
  return (
    <table>
      <tbody>
        <tr>
        <td>{props.text}</td>
        <td> {props.average / props.all}</td>
          </tr>
          <tr>
        <td>{props.text1}</td>
        <td>{props.positive / props.all}</td>
        </tr>
        </tbody>
      </table>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text} </button>;
};

const App = (props) => {
  const [goodCounter, setGood] = useState(0);
  const [neutralCounter, setNeutral] = useState(0);
  const [badCounter, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [all, setAll] = useState(0);

  const increaseGoodByOne = () => {
    setGood(goodCounter + 1);
    setAverage(average + 1);
    setAll(all + 1);
  };
  const increaseNeutralByOne = () => {
    setNeutral(neutralCounter + 1);
    setAverage(average + 0);
    setAll(all + 1);
  };
  const increaseBadByOne = () => {
    setBad(badCounter + 1);
    setAverage(average - 1);
    setAll(all + 1);
  };
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGoodByOne} text="good" />
      <Button handleClick={increaseNeutralByOne} text="neutral" />
      <Button handleClick={increaseBadByOne} text="bad" />
      <h1>Statistics</h1>
      <Statistics
        text="good"
        counter={goodCounter}
        text1="neutral"
        counter1={neutralCounter}
        text2="bad"
        counter2={badCounter}
        text3="all"
        counter3={all}
      />
      <StatisticsLine
        text="average"
        average={average}
        text1="positive"
        positive={goodCounter}
        all={all}
      />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
