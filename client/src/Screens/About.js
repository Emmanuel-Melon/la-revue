import React from 'react'

const About = () => {
  return (
    <main className='about'>
      <section>
        <div className='about-header'>
          <h3>About La Revue</h3>
          <p>A fictional restaurant reviewing website where users could anonymously add and review restaurants. </p>

          <p> Desipte its fictious nature, La Revue also provides real restaurant dta but doesn't allow you to alter any of that.
          You only alter what you create.
          </p>
        </div>
        <div className='about-body'>
          <div className='image'>
            <img src='https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' alt='' className='dummy' />
          </div>
          <div className='info'>
            <h3>How to use</h3>
            <ul>
              <li>You can add fake restaurants in any given location</li>
              <li>It uses geolocation information to detect nearby restaurants</li>
            </ul>

            <h3>Disclaimer</h3>
            <p>User added restaurants are purely fictional and will not be added to Google maps. <br/>
            They'll only be accessible from La Revue. <br/>
            La Revue doesn't authenticate users and everything is done anonymously.
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div>
          <p>Info</p>
        </div>
        <div>
          <p>stack used</p>
        </div>
        <div>
          <p>contact info</p>
        </div>
      </footer>
    </main>
  )
}

export default About
