import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * styles
 */
import styled from 'styled-components'
const Header = styled.header`
  background: rgb(67,27,84);
  background: linear-gradient(90deg, rgba(67,27,84,1) 0%, rgba(55,16,74,1) 54%, rgba(14,32,79,1) 90%);
  padding: 0.1em;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: solid 0.2em gold;
`

const Navbrand = styled.p`
  color: gold;
  text-decoration: none;
`

// change to a element
// handle active links
const Link = styled.li`
  margin: 0.5em;
  text-decoration: none;
  transition: all .4s ease-in-out;
  color: gold;
  border: solid 0.2em transparent;
  
  &:hover {
    transform: scale(1.0.1);
    cursor: pointer;
    color: #ffffff;
  }
  
  &:active {
  color: green;
  }
`

const Nav = styled.nav`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
`

/**
 * @returns {*}
 * @constructor
 */
const Navbar = () => {
  return (
    <Header>
      <div>
        <NavLink to='/'>
          <Navbrand>Revue</Navbrand>
        </NavLink>
      </div>
      <div>
        <Nav>
          <NavLink to='/about'><Link>About</Link></NavLink>
        </Nav>
      </div>
    </Header>
  )
}

export default Navbar
