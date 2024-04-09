import React, { useState } from 'react'


function Form() {  
  
  const [coffeeValue, setCoffeeValue] = useState(50);

  const handleCoffeeSlider = (event) => {
    setCoffeeValue(event.target.value);
  };

  const [creamerValue, setcreamerValue] = useState(50);

  const handleCreamerSlider = (event) => {
    setcreamerValue(event.target.value);
  };


  return (
    <> 
      <div className='container'>
        <div className="child-container image-container">
        </div>
        <div className="child-container form-container">
        <form id="myForm">
          <h2> Enter Your Preferences</h2>
          <div class="form-group">
          <label for="slider1">Coffee</label>
          <input
          type="range"
          id="slider"
          name="coffee"
          min="0"
          max="100"
          value={coffeeValue}
          onChange={handleCoffeeSlider}
        />
          </div>

          <div class="form-group">
          <label for="slider2">Creamer</label>
          <input
          type="range"
          id="slider"
          name="creamer"
          min="0"
          max="100"
          value={creamerValue}
          onChange={handleCreamerSlider}
        />
          </div>

          <div class="form-group">
          <label for="timeInput">Time:</label>
          <input type="time" id="timeInput" name="timeInput" />
          </div>

          <button className='form-submit' type="submit">Submit</button>
        </form>
        </div>
      </div>
    </>
  )
}

export default Form