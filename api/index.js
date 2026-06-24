let app
try {
  app = require('../app').app
} catch (err) {
  app = (req, res) => {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        error: 'Initialization failed',
        message: err.message,
        stack: err.stack,
      }),
    )
  }
}

module.exports = app
