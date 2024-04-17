import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import '../css/form.css';
import alarm from '../sounds/alarm.mp3';
import useSound from 'use-sound';

function Form() {
  const [coffeeValue, setCoffeeValue] = useState(50);
  const [creamerValue, setCreamerValue] = useState(50);
  const [timeInput, setTimeInput] = useState(getCurrentTime());
  const [status, setStatus] = useState('Idle');
  const [cupInPlace, setCupInPlace] = useState(); // Initialize with false
  const [errorMessage, setErrorMessage] = useState(); // Initialize with empty string
  const [play] = useSound(alarm);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get('http://localhost:5000/get_update');
        setStatus(data.data);
        console.log(data.data)
      } catch (error) {
        console.log('Error:', error);
      }
    };

    getData();

    const intervalId = setInterval(getData, 5000);

    return () => clearInterval(intervalId);
  }, []); 

  const checkCup = async () => {
    try {
      const cupData = await axios.get('http://localhost:5000/cup');
      return cupData.data.cupStatus;
    } catch (error) {
      console.error('Error:', error);
      return false; // Return false in case of error
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const cup = await checkCup();
  //     console.log(cup)
  //     setCupInPlace(cup); // Update cupInPlace after async call
  //   };
  //   fetchData();
  // }, []); // Run once on component mount

  useEffect(() => {
    if (cupInPlace === true) {
      let data = {
        coffee: coffeeValue,
        creamer: creamerValue,
        time: timeInput,
        status: status,
        cupInPlace: cupInPlace,
      };
      postData(data);
    } else if (cupInPlace==false) {
      setErrorMessage('Coffee Cup Not In Place!');
    }
  }, [cupInPlace]); // Dependency array with all dependencies

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  async function postData(content) {
    try {
      const response = await axios.post('http://localhost:5000/brew', { content });
      console.log(response.data.content);
      setStatus(response.data.content.status);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cup = await checkCup(); // Wait for checkCup to resolve
    setCupInPlace(cup);
  };

  return (
    <>
      <div className="container">
        <div className="child-container image-container"></div>
        <div className="child-container form-container">
          {status === 'Idle' && (
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
                />{' '}
                <span>{coffeeValue / 20} tbs</span>
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
                />{' '}
                <span>{creamerValue / 20} tbs</span>
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
              {errorMessage && <p className="error-message"> {errorMessage} </p>}
              <button
                className={`form-submit ${status === 'Brewing' ? 'disabled-button' : ''}`}
                onClick={handleSubmit}
                disabled={status === 'Brewing'}
              >
                {timeInput == getCurrentTime() ? 'Brew Now' : 'Set Time'}
              </button>
            </form>
          )}
          {status != 'Idle' && <Table coffee={coffeeValue} creamer={creamerValue} time={timeInput} status={status} />}
        </div>
      </div>
    </>
  );
}

export default Form;