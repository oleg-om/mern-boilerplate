import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/auth'

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

const AuthVerify = (props) => {
  const dispatch = useDispatch()
  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  props.history.listen(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      const decodedJwt = parseJwt(user.accessToken)

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut()
      }
    }
  })

  return <div>AuthVerify</div>
}

export default withRouter(AuthVerify)
