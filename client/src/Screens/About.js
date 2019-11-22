import React from 'react'

const About = () => {
  return (
    <main className='about'>
      <section>
        <div className='about-header'>
          <h3>About La Revue</h3>
          <p>A fake restaurant reviewer</p>
        </div>
        <div className='about-body'>
          <div className='image'>
            <img src="https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" className='dummy'/>
          </div>
          <div className='info'>
            <h3>With La Revue</h3>
            <p>You can do the following</p>
            <ul>
              <li>You can add fake restaurants in any given location</li>
              <li>It uses geolocation information to detect nearby restaurants</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
