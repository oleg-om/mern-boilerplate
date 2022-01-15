import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import message from './message'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    message
  })

export default createRootReducer
