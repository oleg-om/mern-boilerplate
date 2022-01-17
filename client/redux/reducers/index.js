import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import message from './message'
import accounts from './accounts'
import months from './months'
import categories from './categories'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    message,
    accounts,
    months,
    categories
  })

export default createRootReducer
