import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * components
 */
import CustomButton from '../Components/CustomButton'
import CustomImage from '../Components/CustomImage'

/**
 * styles
 */
import styled from 'styled-components'
const Wrapper = styled.main``
const AboutContent = styled.div`
  color: #060415;
  background: #f7f7f7;
`
const AboutHeader = styled.div`
  background: rgb(67,27,84);
  background: linear-gradient(90deg, rgba(67,27,84,1) 0%, rgba(55,16,74,1) 54%, rgba(14,32,79,1) 90%);
  color: white;
  padding: 18px;
`

const AboutBody = styled.div`
display: flex;
`

const AboutLeftPane = styled.div`
  flex: 2;
`

const AboutRightPange = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 18px;
`

const Heading = styled.h3`
  color: gold;
`

const GreyHeading = styled.h3`
  color: #412364;
`

const Instructions = styled.ul`
  padding-left: 0.5em;
`
const InstructionsItem = styled.li`
  border-left: solid 0.2em rebeccapurple;
  margin: 0.5em;
  padding: 0.5em;
`

/**
 *
 * @returns {*}
 * @constructor
 */
const About = () => {
  return (
    <Wrapper>
      <AboutContent>
        <AboutHeader>
          <Heading>About La Revue</Heading>
          <p>A fictional restaurant reviewing website that allows users to anonymously add and review restaurants. </p>

          <p> Despite its factious nature, La Revue also provides real restaurant dta but doesn't allow you to alter any of that.
          You only alter what you create.
          </p>
        </AboutHeader>
        <AboutBody>
          <AboutLeftPane>
            <CustomImage
              src='https://images.unsplash.com/photo-1526234362653-3b75a0c07438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80'
              alt='a stock image of a restaurant'
            />
          </AboutLeftPane>
          <AboutRightPange>
            <GreyHeading>How to use</GreyHeading>
            <Instructions>
              <InstructionsItem>Click on any location on the map to add a new fake restaurants.</InstructionsItem>
              <InstructionsItem>It uses geolocation information to detect nearby restaurants.</InstructionsItem>
            </Instructions>
            <NavLink to='/'>
              <CustomButton>
                Get Started
              </CustomButton>
            </NavLink>
            <GreyHeading>Disclaimer</GreyHeading>
            <p>User added restaurants are purely fictional and will not be added to Google maps. <br />
            They'll only be accessible from La Revue. </p>
            <p>
            La Revue doesn't authenticate users and everything is done anonymously.
            </p>
          </AboutRightPange>
        </AboutBody>
      </AboutContent>
    </Wrapper>
  )
}

export default About
