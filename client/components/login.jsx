import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import { login, loginGoogle } from '../redux/actions/auth'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()

  const onChangeUsername = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    dispatch(login(email, password))
      .then(() => {
        props.history.push('/profile')
        window.location.reload()
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const GOOGLE_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

  const handleLoginGoogle = (googleData) => {
    dispatch(loginGoogle(googleData))
      .then(() => {
        // props.history.push('/profile')
        // window.location.reload()
      })
      .catch(() => {
        setLoading(false)
      })
    // store returned user somehow
  }

  if (isLoggedIn) {
    return <Redirect to="/profile" />
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
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeUsername}
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
            <button
              type="button"
              onClick={handleLogin}
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && <span className="spinner-border spinner-border-sm" />}
              <span>Login</span>
            </button>
            <GoogleLogin
              clientId={GOOGLE_ID}
              buttonText="Log in with Google"
              onSuccess={handleLoginGoogle}
              onFailure={handleLoginGoogle}
              cookiePolicy="single_host_origin"
            />
            <a href="/register">Register</a>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
