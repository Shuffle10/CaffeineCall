import React from 'react'
import logo from "../images/logo.png"

function Navbar() {
  return (
    <nav className='navbar'>
        <div className="nav-items logo-container">
            <img src={logo} height={70} />
            CaffeineCall
        </div>
        <ul className="nav-list-items">
            <li className="nav-links">Instructions</li>
            <li className="nav-links">Developers</li>
        </ul>
    </nav>
  )
}

export default Navbar