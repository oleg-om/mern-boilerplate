import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import message from './message'
import accounts from './accounts'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    message,
    accounts
  })

export default createRootReducer
