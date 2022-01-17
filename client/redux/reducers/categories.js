/* eslint-disable default-param-last */
import {
  GET_CATEGORYS,
  GET_CATEGORYS_BY_PAGE,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from '../actions/categories'

const initialState = {
  list: [],
  isLoaded: false,
  currentPage: 1,
  numberOfPages: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORYS_BY_PAGE: {
      return {
        ...state,
        list: action.categorys,
        isLoaded: true,
        currentPage: action.currentPage,
        numberOfPages: action.numberOfPages
      }
    }
    case GET_CATEGORYS: {
      return {
        ...state,
        list: action.categorys,
        isLoaded: true,
        currentPage: 1,
        numberOfPages: 1
      }
    }
    case CREATE_CATEGORY: {
      return { ...state, list: [...state.list, action.category], isLoaded: true }
    }
    case UPDATE_CATEGORY: {
      return {
        ...state,
        list: state.list.map((it) => {
          return action.category.id === it.id ? action.category : it
        }),
        isLoaded: true
      }
    }
    case DELETE_CATEGORY: {
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

export function getCategorys(id) {
  return (dispatch) => {
    fetch(`/api/category/${id}`)
      .then((r) => r.json())
      .then(({ data: categorys }) => {
        dispatch({ type: GET_CATEGORYS, categorys })
      })
  }
}

export function getCategorysByPage(id, page) {
  return (dispatch) => {
    fetch(`/api/category/${id}/${page}`)
      .then((r) => r.json())
      .then(({ data: categorys, currentPage, numberOfPages }) => {
        dispatch({ type: GET_CATEGORYS_BY_PAGE, categorys, currentPage, numberOfPages })
      })
  }
}

export function createCategory(name) {
  return (dispatch) => {
    fetch('/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    })
      .then((r) => r.json())
      .then(({ data: category }) => {
        dispatch({ type: CREATE_CATEGORY, category })
      })
  }
}

export function updateCategory(id, name) {
  return (dispatch) => {
    fetch(`/api/category/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    })
      .then((r) => r.json())
      .then(({ data: category }) => {
        dispatch({ type: UPDATE_CATEGORY, category })
      })
  }
}

export function deleteCategory(id) {
  return (dispatch) => {
    fetch(`/api/category/${id}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then(() => {
        dispatch({ type: DELETE_CATEGORY, id })
      })
  }
}
