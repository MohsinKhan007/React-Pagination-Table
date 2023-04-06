// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0'
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 4000

var cors_proxy = require('cors-anywhere')

let username = '90316-125'
let password = 'pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3'
cors_proxy
  .createServer({
    originWhitelist: ['http://localhost:3000', 'http://172.25.0.1:3000'],
    requireHeader: ['origin'],
    setHeaders: function (headers, req) {
      headers['Content-Type'] = 'application/json'
      headers['Access-Control-Allow-Origin'] = req.headers.origin
      headers['Authorization'] =
        'Basic ' + Buffer.from(username + ':' + password).toString('base64')
      return headers
    },
    removeHeaders: ['cookie', 'cookie2'],
  })
  .listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port)
  })
