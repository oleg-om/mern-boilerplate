import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import EventBus from '../common/EventBus'
import { logout } from '../redux/actions/auth'
// import  { history } from '../redux'
// import {clearMessage} from ''

const Startup = (props) => {
  const dispatch = useDispatch()
  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  useEffect(() => {}, [])

  //   useEffect(() => {
  //   history.listen((location) => {
  //     dispatch(clearMessage()); // clear message when changing location
  //   });
  // }, [dispatch]);

  useEffect(() => {
    EventBus.on('logout', () => {
      logOut()
    })

    return () => {
      EventBus.remove('logout')
    }
  }, [logOut])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
