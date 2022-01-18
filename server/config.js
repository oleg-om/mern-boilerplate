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
  jwtRefreshExpiration: 86400, // 24 hours
  REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  GOOGLE_MY_CLIENT_SECRET: process.env.GOOGLE_MY_CLIENT_SECRET
}

module.exports = options
