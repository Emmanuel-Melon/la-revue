import React, { Component } from "react";
import '../App.css'
import { FaFilter} from "react-icons/fa";
import Map from "../Components/Map";
import SearchRestarants from "../Components/Search";
import Filter from "../Components/Filter";
import ListRestaurants from "../Components/ListRestaurants";

/**
 * utils
 */
import API from '../Utils/api'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    }
  }
  componentDidMount () {
    this.getReviews()
  }

  async getReviews () {
    try {
      const api = new API('/reviews')
      const reviews = await api.fetchData()
      console.log(reviews)
    } catch (error) {
      console.log(error)
    }
  }

  showControls = () => {
    console.log(this.state)
    this.setState(previousState  => {
      return Object.assign({}, previousState, {
        hidden: !previousState.hidden
      })
    })
  }

  render () {
    return (
      <div>
        <main className='wrapper'>
          <section className='map'>
            <Map
              isMarkerShown
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCj2IDnv8a9yaw4XPRSO4JgKYMuyqWhsEs'
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </section>
          <section className='sidebar'>
            <div className='controls'>
              <h1 className='header'>Restaurants in Kampala</h1>
              <p>Click on Map to add a new restaurant</p>
              <div>
                <button onClick={this.showControls} className='toggle'><FaFilter /> Filter Restaurants</button>
              </div>
            </div>
            {
              !this.state.hidden ? (
                <div>
                  <SearchRestarants />
                  <Filter />
                </div>
              ) : null
            }
            <ListRestaurants />
          </section>
        </main>
      </div>
    )
  }
}

export default HomeScreen
