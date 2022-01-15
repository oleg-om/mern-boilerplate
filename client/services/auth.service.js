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

const login = (username, password) => {
  return api
    .post('/auth/signin', {
      username,
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
}

export default {
  register,
  login,
  logout
}
