var request = require('request')

// Default # of tries for test
var HTTP_CHECK_TRIES = 10

// Default interval in between HTTP checks in ms
var HTTP_CHECK_INTERVAL = 1000

//
// **opts** an object with options
//  - url: URL to check
//  - check: Function to validate response object (default `response is truthy`)
//  - checkTries: Number of tries before failing the test (default 10)
//  - checkInverval: Interval between checks in milliseconds (default 1000)
//  - log: Custom log function, defaults to console.log
//
module.exports = function(opts, cb) {
  var checkTries = opts.checkTries
  if (opts.checkTries === undefined) {
    checkTries = HTTP_CHECK_TRIES
  }
  var checkInterval = opts.checkInterval
  if (opts.checkInterval === undefined) {
    checkInterval = HTTP_CHECK_INTERVAL
  }
  var statusCheck = opts.check || function(response) {
    return response ? true : false
  }
  if (!opts.url) {
    throw new Error("you must specify a url property for your httpcheck")
  }
  var log = opts.log || console.log
  var tries = 0
  var intervalId = setInterval(function() {
    request(opts.url, function(err, response) {
      tries++
      if (!err && statusCheck(response)) {
        log("Got HTTP GET on " + opts.url + " indicating server is up")
        clearInterval(intervalId)
        return cb(null)
      } else {
        log("Error on " + opts.url + ": " + err)
        if (tries >= checkTries) {
          var msg = ("HTTP GET check on " + opts.url + " failed after " + tries
            + " tries, server not up - failing test")
          log(msg)
          clearInterval(intervalId)
          return cb(msg, null)
        }
      }
    })
  }, checkInterval)
  return intervalId
}
