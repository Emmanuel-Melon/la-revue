import React from 'react'

const Navbar = () => {
  return (
    <header className='navbar'>
      <div>
        <h3 className='navbrand'>La Revue</h3>
      </div>
      <div>
        <ul className='nav'>
          <li className='link'>About</li>
          <li className='link'>Restaurants</li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
