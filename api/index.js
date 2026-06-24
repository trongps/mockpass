let app
try {
  app = require('../app').app
} catch (err) {
  app = (req, res) => {
    res.status(500).json({
      error: 'Initialization failed',
      message: err.message,
      stack: err.stack,
    })
  }
}

module.exports = app
