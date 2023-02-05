import React, {useEffect, useState} from 'react';
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

  function addAThing(){
    
    const thing = {
      value: newThing,
      id:things.length + 1
    };

    setThings([...things,thing]);
    localStorage.setItem('stuff',JSON.stringify([...things,thing]))
    setNewThing('');
  }
  
  function deleteThing(id){
    const newArray = things.filter(thing => thing.id !== id);
    setThings(newArray);
    localStorage.setItem('stuff',JSON.stringify(newArray));
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <p>by Kayra</p>
      
      <input 
          type="text" 
          placeholder='Type a thing to do...'
          onChange={e => setNewThing(e.target.value)} />
      
      <button id='adder' onClick={() => addAThing()}>Add</button>

      <table>
      <ul>
        {things.map(thing =>{
          return(
            <li key={thing.id}>
              {thing.value}
              <button onClick={() => deleteThing(thing.id)}>X</button>
            </li> )
        })}
      </ul>
      </table>

    </div>
  );
}

export default App;
