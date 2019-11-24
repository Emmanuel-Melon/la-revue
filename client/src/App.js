import React, { Component } from 'react'
import './App.css'

// improve ux by adding instructions above the filter button
// click on map to add restaurant
// how to use page
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
import RestaurantsScreen from './Screens/Restaurants'
import Navabar from './Components/Navbar'

// use context to set user current location
class App extends Component {
  render () {
    return (
      <Router>
        <Navabar />
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/about' component={AboutScreen} />
          <Route exact path='/restaurants' component={RestaurantsScreen} />
        </Switch>
        <footer>
          <p>OpenClassrooms 2019</p>
        </footer>
      </Router>
    )
  }
}

export default App
