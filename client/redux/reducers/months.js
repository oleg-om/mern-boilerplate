/* eslint-disable default-param-last */
import { GET_MONTHS, CREATE_MONTH, UPDATE_MONTH, DELETE_MONTH } from '../actions/months'

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MONTHS: {
      return { ...state, list: action.months }
    }
    case CREATE_MONTH: {
      return { ...state, list: [...state.list, action.month] }
    }
    case UPDATE_MONTH: {
      return {
        ...state,
        list: state.list.map((it) => {
          return action.month.id === it.id ? action.month : it
        })
      }
    }
    case DELETE_MONTH: {
      return {
        list: state.list.filter((it) => {
          return action.id !== it.id
        })
      }
    }
    default:
      return state
  }
}

export function getMonths(id) {
  return (dispatch) => {
    fetch(`/api/month/${id}`)
      .then((r) => r.json())
      .then(({ data: months }) => {
        dispatch({ type: GET_MONTHS, months })
      })
  }
}

export function createMonth(name) {
  return (dispatch) => {
    fetch('/api/month', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    })
      .then((r) => r.json())
      .then(({ data: month }) => {
        dispatch({ type: CREATE_MONTH, month })
      })
  }
}

export function updateMonth(id, name) {
  return (dispatch) => {
    fetch(`/api/month/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    })
      .then((r) => r.json())
      .then(({ data: month }) => {
        dispatch({ type: UPDATE_MONTH, month })
      })
  }
}

export function deleteMonth(id) {
  return (dispatch) => {
    fetch(`/api/month/${id}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then(() => {
        dispatch({ type: DELETE_MONTH, id })
      })
  }
}
