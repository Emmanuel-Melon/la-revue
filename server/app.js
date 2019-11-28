const express = require('express')
const path = require('path')

/**
 * init Express.js and Node Server
 */
const app = express()

/**
 * init routes
 */
require('./init/middleware')(app)
require('./init/routes')(app)



app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname, '../client/build/index.html')));
});

module.exports = app
