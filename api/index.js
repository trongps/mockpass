const { app } = require('../app')

// Vercel Serverless Functions require exporting the Express app
// instead of calling app.listen()
module.exports = app
