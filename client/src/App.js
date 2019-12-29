import React, {
  useState,
  createContext,
  useEffect,
  useContext
} from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

/**
 * services
 */
import Geolocation from './Services/Geolocation'

import AboutScreen from './Screens/About'
import HomeScreen from './Screens/Home'
import Navabar from './Components/Navbar'

// use context to set user current location
const App = () => {
  return (
    <Router>
      <Navabar />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/about' component={AboutScreen} />
      </Switch>
      <footer>
        <p>OpenClassrooms 2019</p>
      </footer>
    </Router>
  )
}

export default App
