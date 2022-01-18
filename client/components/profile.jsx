import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/auth'

const Profile = (props) => {
  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  if (!currentUser) {
    return <Redirect to="/login" />
  }

  const handleLogout = () => {
    // dispatch(logout()).then(() => {
    //   props.history.push('/profile')
    //   window.location.reload()
    // })
    // .catch(() => {
    //   setLoading(false)
    // })
    dispatch(logout())
    props.history.push('/profile')
    window.location.reload()
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <button type="button" onClick={handleLogout} className="btn btn-primary btn-block">
        <span>Logout</span>
      </button>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
