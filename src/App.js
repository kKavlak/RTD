import React, {useState} from 'react';
import './App.css';

function App() {
  
  const[newThing, setNewThing] = useState("");
  const[things, setThings] = useState([]);

  function addAThing(){
    
    const thing = {
      value: newThing,
      id:things.length + 1
    };

    setThings(oldList => [...oldList, thing]);
    setNewThing("");
    //console.log(thing.id)
  }
  
  function deleteThing(id){
    const newArray = things.filter(thing => thing.id !== id);
    setThings(newArray);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <p>by kayra</p>
      
      <input 
          type="text" 
          placeholder='Type a thing to do...'
          onChange={e => setNewThing(e.target.value)} />
      
      <button onClick={() => addAThing()}>Add to list</button>

      <ul>
        {things.map(thing =>{
          return(
            <li key={thing.id}>{thing.value} <button onClick={() => deleteThing(thing.id)}>X</button> </li>
          )
        })}
      </ul>

    </div>
  );
}

export default App;
