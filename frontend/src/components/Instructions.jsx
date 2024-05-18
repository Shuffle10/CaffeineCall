import React from 'react'
import Navbar from './Navbar'
import '../css/instructions.css'

function Instructions() {
  return (
    <>
    <Navbar/>
    <div className='instruction-container'>
        <h2> Instructions </h2>
        <section>
        <h4> Water Kettle:</h4>
        <p>Before starting, ensure the water kettle is filled between the maximum and minimum level indicators.
        Open the lid of the water kettle and fill it with water accordingly.
        Close the lid securely after filling. </p></section>
        <section><h4>Slider Position:</h4>
        <p>Locate the slider on the machine's interface and move it to the "Idle" position as marked on the linear rod.
        This indicates that the machine is ready for operation.</p></section>
        <section><h4>Select Coffee Amount and Creamer:</h4>
        <p>On the webpage, use the provided options to select the desired amount of coffee and creamer.
        Adjust the sliders to input values according to your preferences.</p></section>
        <section><h4>Set Brew Time:</h4>
        <p>Use the time picker on the webpage to set the desired brewing time.
        If you set the time as the current time, a "Brew Now" button will appear.
        Otherwise, you will see a "Set Time" button.</p></section>
        <section><h4>Brewing:</h4>
        <p>If you set the time to brew immediately, click on the "Brew Now" button.
        The machine will start brewing immediately.
        If you set a future time, click on the "Set Time" button.
        The machine will schedule the brew for the specified time.</p></section>
        <section><h4>Wait for Brew:</h4>
        <p>Allow the machine to brew the coffee according to the set parameters.
        An indicator on the webpage will show the progress.</p></section>
        <section><h4>Alarm and Dispensing:</h4>
        <p>After brewing, an alarm will sound to indicate that the coffee is ready.
        Grab your cup enjoy the fresh hot brew!</p></section>

    </div>
    
    </>
  )
}

export default Instructions