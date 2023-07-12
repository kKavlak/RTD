import React, {useEffect, useState, useRef} from 'react';
import moment from 'moment/moment';
import { useKeys } from './useKeys';
import './App.css';
import Head from './Head';

function App() {
  
  const stuff = localStorage.getItem('stuff');
  const ended = localStorage.getItem('ended')

  const stored = JSON.parse(stuff);
  const previous = JSON.parse(ended);


  const[newThing, setNewThing] = useState("");
  const[things, setThings] = useState(stuff === "" ? [] : stored);
  const[completed, setCompleted] = useState(ended === "" ? [] : previous);
  const[flag, setFlag] = useState(0);
  
  
  const addAThing = () => {
    if(newThing !== ''){
      const thing = {
        value: newThing,
        id:things.length + 1,
        atTime: moment().format('MMMM do, yyyy H:mma')
      };
      setThings(oldList => [...oldList,thing]);
      localStorage.setItem('stuff',JSON.stringify([...things,thing]));
      setNewThing("");
      ref.current.value = '';
    }
  }

  function thingComplete(id){
    const clicked = things.find(thing => thing.id == id);
    const completee = {
      value: clicked.value,
      id: clicked.id,
      atTime: clicked.atTime,
      endTime: moment().format('MMMM do, yyyy H:mma')
    }
    setCompleted(oldList => [...oldList,completee]);
    localStorage.setItem('ended',JSON.stringify([...completed,completee]));

    const newArray = things.filter(thing => thing.id !== id);
    setThings(newArray);
    localStorage.setItem('stuff',JSON.stringify(newArray));
  }

  function clearBin(){
    localStorage.setItem('ended',JSON.stringify([]));
    setCompleted([]);
  }

  useKeys(addAThing,'Enter');

  const ref = useRef(null);

  if(flag == 0){
  return (
    <div className="App">
      <Head/>
      <input id='inputText'
          type="text" 
          ref={ref}
          placeholder='Type a thing to do...'
          onChange={e => setNewThing(e.target.value)} />
      <button id='adder' onClick={addAThing}>Add</button>
      <p><button className='backNforth' onClick={() => setFlag(1)}>See completed tasks</button></p>
      
      <div id='holder'>
      <h2>Pending Tasks</h2>
      <ul>
        {
        things.length > 0 ?
        things.map(thing =>{
          return(
            <li key={thing.id}>
              {thing.value} <br /><span id='whatTime'> Started at {thing.atTime}</span> 
              <button onClick={() => thingComplete(thing.id)}>&#9989;</button>
            </li> )
        })
        : "No pending tasks"
        }
      </ul>
      </div>

    </div>
  );
}
else{
  return(
    <div className="App">
      <Head/>
      <h2>Completed Tasks</h2>
      <div id='holder'>
        This is where tasks go when " &#9989; " is clicked 
        <ul>
          {
           completed.map(completee => {return(<li key={completee.id}>
            {completee.value} <br /><span id='whatTime'> Started at {completee.atTime}</span>
            <br /> <span id='whatTime'>Completed at {completee.endTime}</span>
          </li> )})
          }
        </ul>
      </div>
      {completed.length > 0 ?
       <button className='backNforth' onClick={clearBin}>Clear Completed Tasks</button> :
       "No completed tasks"}
      <br></br> <br></br>
      <button className='backNforth' onClick={() => setFlag(0)}>Back to Main</button>
    </div>
  );
}
}

export default App;
