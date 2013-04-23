## node-httpcheck

Simple HTTP status checker w/ timeout.

## Installation

`npm install httpcheck`

## Usage

```javascript

var check = require('httpcheck')


check({url:"http://example.com"}, function(err) {
    if (err) {
        console.log("HTTP check for example.com failed!")
        throw err
    }
    console.log("HTTP check for example.com has passed")
})

```

## API

`httpcheck` takes a small number of parameters:

function(opts, cb)

`opts` is an object with properties:

- `url`: URL to run HTTP check against. Required.
- `checkTries`: Number of times to try the HTTP check. Default is 10.
- `checkInterval`: Interval between HTTP check tries in ms. Default is 1000ms (1 second)
- `check`: Custom check function which accepts a HTTP response object and returns
`true` or `false` on success or failure. Default is that response object is truthy.

`cb` is a function callback which takes a single parameter indicating error.

## Tests

`httpcheck` has tests. Execute `npm test` to run them.

## License

`httpcheck` is released under the BSD license.

