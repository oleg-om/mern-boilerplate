import api from './api'
import TokenService from './token.service'

const API_URL = 'http://localhost:8087/api/auth/'

const register = (username, email, password) => {
  return api.post(`${API_URL}signup`, {
    username,
    email,
    password
  })
}

const login = (email, password) => {
  return api
    .post('/auth/signin', {
      email,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data)
      }

      return response.data
    })
}

const logout = () => {
  TokenService.removeUser()
  return ''
}

const googleLogin = async (googleData) => {
  console.log(googleData.tokenId)
  return api
    .post('/auth/google', {
      token: googleData.tokenId
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data)
      }

      return response.data
    })
}

export default {
  register,
  login,
  logout,
  googleLogin
}
