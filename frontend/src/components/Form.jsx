import React, { useState } from 'react'
import axios from 'axios'


function Form() {
  
  const [coffeeValue, setCoffeeValue] = useState(50);
  const [creamerValue, setCreamerValue] = useState(50);
  const [timeInput, setTimeInput] = useState(getCurrentTime())
  const [status, setStatus] = useState("Idle")

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0'); 
    return `${hours}:${minutes}`;
  }

  async function postData(content){
    try {
      const response = await axios.post('http://localhost:5000/brew', {content});
      console.log(response.data.content);
      setStatus(response.data.content.status)
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const handleCoffeeSlider = (event) => {
    setCoffeeValue(event.target.value);
  };


  const handleCreamerSlider = (event) => {
    setCreamerValue(event.target.value);
  };

  const handleTimeInput = (event) => {
    setTimeInput(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      'coffee':coffeeValue,
      'creamer':creamerValue,
      'time':timeInput,
      'status':status
    }
    postData(data)
  }


  return (
    <> 
      <div className='container'>
        <div className="child-container image-container">
        </div>
        <div className="child-container form-container">
        <form id="myForm">
          <h2> Enter Your Preferences</h2>
          <div className="form-group">
          <label htmlFor="slider1">Coffee</label>
          <input
          type="range"
          id="slider"
          name="coffee"
          min="0"
          max="100"
          value={coffeeValue}
          onChange={handleCoffeeSlider}
          required
        />
          </div>

          <div className="form-group">
          <label htmlFor="slider2">Creamer</label>
          <input
          type="range"
          id="slider"
          name="creamer"
          min="0"
          max="100"
          value={creamerValue}
          onChange={handleCreamerSlider}
          required
        />
          </div>

          <div className="form-group">
          <label htmlFor="timeInput">Time:</label>
          <input 
          type="time" 
          value={timeInput} 
          id="time" 
          name="time" 
          onChange={handleTimeInput}
          required
          />
          </div>

          <button 
          className={`form-submit ${status === "Brewing" ? 'disabled-button' : ''}`} 
          onClick={handleSubmit} 
          disabled={status === "Brewing"}>
          Submit
        </button>
        </form>
        </div>
      </div>
    </>
  )
}

export default Form