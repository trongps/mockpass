process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err)
})

module.exports = async (req, res) => {
  try {
    const mockpass = require('../app')
    if (!mockpass || !mockpass.app) {
      throw new Error('app is undefined')
    }

    // Catch-all Express error handler just in case
    // eslint-disable-next-line no-unused-vars
    mockpass.app.use((err, req, res, next) => {
      console.error('Express Error:', err)
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Express Error',
          message: err.message,
          stack: err.stack,
        })
      }
    })

    return mockpass.app(req, res)
  } catch (err) {
    console.error('Initialization Error:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        error: 'Initialization failed',
        message: err ? err.message : 'Unknown error',
        stack: err ? err.stack : '',
      }),
    )
  }
}
