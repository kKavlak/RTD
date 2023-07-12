import React from 'react'

const Completed = ({completed, setFlag, clearBin}) => {
  return (
    <div>
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
      <br/> <br/>
      <button className='backNforth' onClick={() => setFlag(0)}>Back to Main</button>
    </div>
  )
}

export default Completed
