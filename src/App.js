import React, {useEffect, useState, useRef} from 'react';
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
        id:things.length + 1
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
      <p>by Kayra</p>
      
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
              {thing.value}
              <button onClick={() => deleteThing(thing.id)}>X</button>
            </li> )
        })}
      </ul>
      </div>

    </div>
  );
}

export default App;
