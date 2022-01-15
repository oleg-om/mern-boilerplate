import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import message from './message'
import accounts from './accounts'
import months from './months'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    message,
    accounts,
    months
  })

export default createRootReducer
