require('dotenv').config()

const options = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  isSocketsEnabled: process.env.ENABLE_SOCKETS,
  mongoURL: process.env.MONGO_URL,
  secret: process.env.SECRET_KEY,
  // jwtExpiration: 60, // 1 minute
  // jwtRefreshExpiration: 120 // 2 minutes
  jwtExpiration: 3600, // 1 hour
  jwtRefreshExpiration: 86400 // 24 hours
}

module.exports = options
