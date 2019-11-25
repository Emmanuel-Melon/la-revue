import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

/**
 * components
 */
import CustomButton from '../Components/CustomButton'
import CustomImage from '../Components/CustomImage'
import Fine from './fine.svg'

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
  padding: 1em;
`

const AboutRightPange = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
`

const Heading = styled.h3`
  color: gold;
`

const GreyHeading = styled.h3`
  color: #412364;
`

const Instructions = styled.ul``

const InstructionsItem = styled.li`
  border-left: solid 0.3em rebeccapurple;
  margin: 0.3em;
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
              src={Fine}
              alt='a stock image of a restaurant'
            />
            {/* <p>Image is Coutsey of <a href="https://undraw.io">unDraw</a></p> */}
          </AboutLeftPane>
          <AboutRightPange>
            <GreyHeading>How to use</GreyHeading>
            <Instructions>
              <InstructionsItem>Click on any location on the map to add a new fake restaurants.</InstructionsItem>
              <InstructionsItem>It uses geolocation information to detect nearby restaurants.</InstructionsItem>
            </Instructions>
            <NavLink to='/'>
              <CustomButton>
                <FaArrowRight /> Get Started
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
