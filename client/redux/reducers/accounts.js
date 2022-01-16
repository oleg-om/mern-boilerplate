/* eslint-disable default-param-last */
import { GET_ACCOUNTS, CREATE_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from '../actions/accounts'

const initialState = {
  list: [],
  isLoaded: false,
  currentPage: 1,
  numberOfPages: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNTS: {
      return {
        ...state,
        list: action.accounts,
        isLoaded: true,
        currentPage: action.currentPage,
        numberOfPages: action.numberOfPages
      }
    }
    case CREATE_ACCOUNT: {
      return { ...state, list: [...state.list, action.account], isLoaded: true }
    }
    case UPDATE_ACCOUNT: {
      return {
        ...state,
        list: state.list.map((it) => {
          return action.account.id === it.id ? action.account : it
        }),
        isLoaded: true
      }
    }
    case DELETE_ACCOUNT: {
      return {
        list: state.list.filter((it) => {
          return action.id !== it.id
        }),
        isLoaded: true
      }
    }
    default:
      return state
  }
}

export function getAccounts(id, page) {
  return (dispatch) => {
    fetch(`/api/account/${id}/${page}`)
      .then((r) => r.json())
      .then(({ data: accounts, currentPage, numberOfPages }) => {
        dispatch({ type: GET_ACCOUNTS, accounts, currentPage, numberOfPages })
      })
  }
}

export function createAccount(name) {
  return (dispatch) => {
    fetch('/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    })
      .then((r) => r.json())
      .then(({ data: account }) => {
        dispatch({ type: CREATE_ACCOUNT, account })
      })
  }
}

export function updateAccount(id, name) {
  return (dispatch) => {
    fetch(`/api/account/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    })
      .then((r) => r.json())
      .then(({ data: account }) => {
        dispatch({ type: UPDATE_ACCOUNT, account })
      })
  }
}

export function deleteAccount(id) {
  return (dispatch) => {
    fetch(`/api/account/${id}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then(() => {
        dispatch({ type: DELETE_ACCOUNT, id })
      })
  }
}
