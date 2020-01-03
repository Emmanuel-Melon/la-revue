import React from 'react'
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

/**
 * components
 */
import AboutScreen from './Screens/About'
import HomeScreen from './Screens/Home'
import Navabar from './Components/Navbar'
import NotFound from './Screens/404'

// use context to set user current location
const App = () => {
  return (
    <Router>
      <Navabar />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/about' component={AboutScreen} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
