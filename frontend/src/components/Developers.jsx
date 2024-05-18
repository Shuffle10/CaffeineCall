import React from 'react'
import Navbar from './Navbar'
import '../css/developers.css'


function Developers() {
  return (
    <>
    <Navbar/>
    <div className="developers-page">
      <h1 className="page-heading">Developers</h1>
      <div className="profiles">
        <div className="profile">
          <h2>Saphal Pant</h2>
          <p>From: Kathmandu, Nepal</p>
          <p>Email: spa049@gmail.com</p>
          <p>Phone: 737-296-3557</p>
          <p>Major: Computer Science</p>
          <p>Contribution: 3D Modeling, Front End, Circuitry</p>
        </div>
        <div className="profile">
          <h2>Jack Revelett</h2>
          <p>From: Austin, Texas</p>
          <p>Email: jre049@gmail.com</p>
          <p>Phone: 737-296-3557</p>
          <p>Major: Computer Science</p>
          <p>Contribution: Back End, Documentation, Assembly</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Developers