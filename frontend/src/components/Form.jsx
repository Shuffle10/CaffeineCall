import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import '../css/form.css';
import background from '../images/background.jpg'

const IP_ADDRESS = 'http://138.47.153.247:5000'

function Form() {
  const [coffeeValue, setCoffeeValue] = useState(20);
  const [creamerValue, setCreamerValue] = useState(55);
  const [timeInput, setTimeInput] = useState(getCurrentTime());
  const [status, setStatus] = useState("Idle");
  const [cupInPlace, setCupInPlace] = useState(); 
  const [errorMessage, setErrorMessage] = useState(""); // Initialize with empty string
  const [brewNow, setBrewNow] = useState(false);

 

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`${IP_ADDRESS}/get_update`);
        setStatus(data.data);
        setErrorMessage("")
      } catch (error) {
        setErrorMessage("Could not connect to the machine");
      }
    };

    getData();

    const intervalId = setInterval(getData, 3000);

    return () => clearInterval(intervalId);
  }, []); 

  const checkCup = async () => {
    try {
      const cupData = await axios.get(`${IP_ADDRESS}/cup`);
      return cupData.data.cupStatus;
    } catch (error) {
      return ""; 
    }
  };

  useEffect(() => {
    if (cupInPlace === true) {
      let data = {
        coffee: coffeeValue/20,
        creamer: creamerValue/20,
        time: !brewNow ? timeInput : "now",
        status: status,
        cupInPlace: cupInPlace,
      };
      postData(data);
    } else if (cupInPlace==false) {
      setErrorMessage('Coffee Cup Not In Place!');
    }
    else {
      setErrorMessage("Could not connect top the machine")
    }
  }, [cupInPlace]);

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  async function postData(content) {
    try {
      const response = await axios.post(`${IP_ADDRESS}/brew`, { content });
      setStatus(response.data.content.status);
    } catch (error) {
      setErrorMessage('Could not connect to the machine');
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

  
  const handleCheckboxChange = () => {
    setBrewNow(!brewNow);
  };

  return (
    <>
      <div className="container">
        <div className="child-container image-container">
          <img className='bg-image' src={background} alt="logo"/>
        </div>
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

              <label>
              <input
                type="checkbox"
                checked={brewNow}
                onChange={handleCheckboxChange}
                style={{marginRight : '10px'}}
              />
              Brew Now
            </label>

             {!brewNow && <div className="form-group">
                <label htmlFor="timeInput">Time:</label>
                <input
                  type="time"
                  value={timeInput}
                  id="time"
                  name="time"
                  onChange={handleTimeInput}
                  required
                />
              </div> }
              {errorMessage.length>0 && <p className="error-message"> {errorMessage} </p>}
              <button
                className={`form-submit`}
                onClick={handleSubmit}
                disabled={errorMessage.length>0}
              >
                Brew
              </button>
            </form>
          )}
          {status != 'Idle' && <Table coffee={coffeeValue} creamer={creamerValue} time={timeInput} status={status}/>}
        </div>
      </div>
    </>
  );
}

export default Form;