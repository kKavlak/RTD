import React, {useEffect, useState, useRef} from 'react';
import moment from 'moment/moment';
import { useKeys } from './useKeys';
import './App.css';

function App() {
  
  const[newThing, setNewThing] = useState("");
  const[things, setThings] = useState([]);
  
  useEffect(()=>{
    if(localStorage.getItem('stuff')){
      const stored = JSON.parse(localStorage.getItem('stuff'));
      setThings(stored);
    }
  },[]);

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

  function deleteThing(id){
    const newArray = things.filter(thing => thing.id !== id);
    setThings(newArray);
    localStorage.setItem('stuff',JSON.stringify(newArray));
  }

  useKeys(addAThing,'Enter');

  const ref = useRef(null);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <p id='signature'>by Kayra</p>
      
      <input id='inputText'
          type="text" 
          ref={ref}
          placeholder='Type a thing to do...'
          onChange={e => setNewThing(e.target.value)} />
      
      <button id='adder' onClick={addAThing}>Add</button>

      <div id='holder'>
      <ul>
        {things.map(thing =>{
          return(
            <li key={thing.id}>
              {thing.value} <br /><span id='whatTime'> Started at {thing.atTime}</span> 
              <button onClick={() => deleteThing(thing.id)}>&#9989;</button>
            </li> )
        })}
      </ul>
      </div>

    </div>
  );
}

export default App;
