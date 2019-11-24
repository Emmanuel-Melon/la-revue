import React from 'react'
import { NavLink } from 'react-router-dom'

const About = () => {
  return (
    <main className='about'>
      <section className='about-content'>
        <div className='about-header'>
          <h3>About La Revue</h3>
          <p>A fictional restaurant reviewing website that allows users to anonymously add and review restaurants. </p>

          <p> Desipte its fictious nature, La Revue also provides real restaurant dta but doesn't allow you to alter any of that.
          You only alter what you create.
          </p>
        </div>
        <div className='about-body'>
          <div className='image'>
            <img src='https://images.unsplash.com/photo-1526234362653-3b75a0c07438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80' alt='' className='dummy' />
          </div>
          <div className='info'>
            <h3>How to use</h3>
            <ul className='instructions'>
              <li>Click on any location on the map to add a new fake restaurants.</li>
              <li>It uses geolocation information to detect nearby restaurants.</li>
            </ul>
            <NavLink to='/'><button className='submit'>Get Started</button></NavLink>
            <h3>Disclaimer</h3>
            <p>User added restaurants are purely fictional and will not be added to Google maps. <br/>
            They'll only be accessible from La Revue. <br/>
            La Revue doesn't authenticate users and everything is done anonymously.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
