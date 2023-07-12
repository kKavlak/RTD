import React, {useEffect, useState, useRef} from 'react';
import moment from 'moment/moment';
import { useKeys } from './useKeys';
import './App.css';
import Head from './Head';
import Pending from './Pending';
import Completed from './Completed';

function App() {
  
  const[newThing, setNewThing] = useState("");
  const[things, setThings] = useState([]);
  const[completed, setCompleted] = useState([]);
  const[flag, setFlag] = useState(0);
  const[clicks, setClicks] = useState(0);
  
  useEffect(()=>{
    if(localStorage.getItem('stuff')){
      const stored = JSON.parse(localStorage.getItem('stuff'));
      setThings(stored);
    }
    if(localStorage.getItem('ended')){
      const previous = JSON.parse(localStorage.getItem('ended'));
      setCompleted(previous);
    }
    if(localStorage.getItem('clicks')){
      const totalClicks = JSON.parse(localStorage.getItem('clicks'));
      setClicks(totalClicks+1);
    }
  },[]);
  
  const ref = useRef();

  
  const addAThing = () => {
    if(newThing !== ''){
      setClicks(clicks+1);
      const thing = {
        value: newThing,
        id:clicks,
        atTime: moment().format('MMMM do, yyyy H:mma')
      };
      setThings(oldList => [...oldList,thing]);
      localStorage.setItem('stuff',JSON.stringify([...things,thing]));
      setNewThing("");
      ref.current.value = "";
      localStorage.setItem('clicks',JSON.stringify(clicks));
      //console.log(clicks);
    }
  }
  
  useKeys(addAThing,'Enter');
  
  function thingComplete(id){
    const clicked = things.find(thing => thing.id == id);
    const completee = {
      value: clicked.value,
      id: clicked.id,
      atTime: clicked.atTime,
      endTime: moment().format('MMMM do, yyyy H:mma')
    }
    setCompleted(finList => [...finList,completee]);
    localStorage.setItem('ended',JSON.stringify([...completed,completee]));

    const newArray = things.filter(thing => thing.id !== id);
    setThings(newArray);
    localStorage.setItem('stuff',JSON.stringify(newArray));
  }

  function clearBin(){
    localStorage.setItem('ended',JSON.stringify([]));
    setCompleted([]);
  }

  console.log(completed)

  return (
    <div className="App">
      <Head/>
      {flag === 0 ? 
      <Pending
        setFlag={setFlag}
        setNewThing={setNewThing}
        addAThing={addAThing}
        things={things}
        thingComplete={thingComplete}
        ref={ref}
      />
      : 
      <Completed
      completed={completed}
      setFlag={setFlag}
      clearBin={clearBin}
      />
      }
    </div>
  );
}


export default App;
