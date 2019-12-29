async function teardown () {
  console.log('Teardown Mongo Connection')
  delete global.mflixDB
}

module.exports = teardown
