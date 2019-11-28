# La Revue
A restaurant review website.  
Part of OpenClassroom's Front-End Developer diploma program.

![Image description](./screenshot.png)

## Overview

La Revue is a fictional restaurant reviewing website that allows users to anonymously add and review restaurants.   
- Real restaurant data is fetched from Google Places API by detecting a user's current location via Google's Geolocation API.
- Forms are available for users to add restaurants and reviews.
- All restaurants and reviews are first persisted into a MongoDB database before getting served to the user.
- To separate concerns, reviews get added to a custom database instead of the actual restaurant to prevent unwanted reviews.
- No authentication mechanism has been implemented, all reviews are completely anonymous.

## Live Demo
The app is deployed on heroku and can be found at this **[URL](https://morning-beach-13124.herokuapp.com/)**

## Running locally

You will need the following dependencies installed on your system.
- [Node.js](https://nodejs.org/en/).
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/lang/en) (both come with Node.js.
- A web or a mobile browser.

### Installation
- Clone the repository using `git clone git+https://github.com/Emmanuel-Melon/la-revue.git`.
- Run `cd la-revue` on your terminal or command line interface.
- Run `yarn install` or `npm install`.
- Open your browser and visit `http://localhost:5000`.

### Built with
- Node.js and Express for the server.
- MongoDB for the database.
- React and styled-components for the frontend.
- Google Maps, Google Places, Google Geolocation and Google Geocoding APIs.
