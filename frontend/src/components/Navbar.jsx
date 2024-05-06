import React from 'react'
import logo from "../images/logo.png"
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <>
    <nav className='navbar'>
        <div className="nav-items logo-container">
            <img src={logo} height={70} />
            CaffeineCall
        </div>
        <ul className="nav-list-items">
            <Link to='/instructions'><li className="nav-links">Instructions</li></Link>
            <li className="nav-links">Developers</li>
        </ul>
    </nav>
    <Outlet/>
    </>
  )
}

export default Navbar