import React, { useState } from 'react'
// import wave from '../assets/images/wave.jpg'

const Month = () => {
  const [counter, setCounterNew] = useState(0)

  return (
    <div>
      <img alt="wave" src="images/wave.jpg" />
      <button type="button" onClick={() => setCounterNew(counter + 1)}>
        updateCounter
      </button>
      <div> Hello World Dashboard {counter} </div>
    </div>
  )
}

export default Month
