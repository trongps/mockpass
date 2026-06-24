module.exports = (req, res) => {
  try {
    const mockpass = require('../app')
    if (!mockpass || !mockpass.app) {
      throw new Error('app is undefined')
    }
    return mockpass.app(req, res)
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        error: 'Initialization or request failed',
        message: err ? err.message : 'Unknown error',
        stack: err ? err.stack : '',
      }),
    )
  }
}
