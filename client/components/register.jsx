import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { register } from '../redux/actions/auth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [language, setLanguage] = useState('en')
  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onChangeLang = (e) => {
    setLanguage(e.target.value)
  }

  // check fields

  const ValidateEmail = () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
    // alert('You have entered an invalid email address!')
    return true
  }

  const handleRegister = () => {
    if (ValidateEmail()) {
      dispatch(register(username, email, password, language))
        .then(() => {
          setSuccessful(true)
        })
        .catch(() => {
          setSuccessful(false)
        })
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <div>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              <div className="form-group">
                <label htmlFor="language">language</label>
                <select
                  type="language"
                  className="form-control"
                  name="language"
                  value={language}
                  onChange={onChangeLang}
                >
                  <option value="en">English</option>
                  <option value="ru">Russian</option>
                </select>
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleRegister}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? 'alert alert-success' : 'alert alert-danger'}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
