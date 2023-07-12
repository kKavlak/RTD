import React from "react";

const Pending = React.forwardRef((props,ref) => (
        <div>
        <input id='inputText'
          type="text" 
          ref={ref}
          placeholder='Type a thing to do...'
          onChange={e => props.setNewThing(e.target.value)} />
        <button id='adder' onClick={props.addAThing}>Add</button>
        <p><button className='backNforth' onClick={() => props.setFlag(1)}>See completed tasks</button></p>
        
        <div id='holder'>
        <h2>Pending Tasks</h2>
        <ul>
        {
        props.things.length > 0 ?
        props.things.map(thing =>{
          return(
            <li key={thing.id}>
              {thing.value} <br /><span id='whatTime'> Started at {thing.atTime}</span> 
              <button onClick={() => props.thingComplete(thing.id)}>&#9989;</button>
            </li> )
        })
        : "No pending tasks"
        }
      </ul>
      </div> 
        </div>
    ));


export default Pending;