import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='navbar'>
      <div>
        <h3><NavLink to='/' className='navbrand'>La Revue</NavLink></h3>
      </div>
      <div>
        <ul className='nav'>
          <li><NavLink to='/about' className='link'>About</NavLink></li>
          <li><NavLink to='/restaurants' className='link'>Restaurants</NavLink></li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
