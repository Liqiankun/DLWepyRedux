import { handleActions } from 'redux-actions'
import { fetchList } from '../types/todo.js'
import { TODO_FETCH_LIST, TODO_UPDATE, TODO_CREATE, TODO_REMOVE } from '../types/todo'

export default handleActions({
  [TODO_FETCH_LIST] (state, action) {
    if (action.error) {
      return state
    } else {
      return {
        ...state,
        list: action.payload
      }
    }
  },
  [TODO_UPDATE] (state, action) {
    if (action.error) {
      return state
    } else {
      return {
        ...state,
        list: state.list.map((t) => {
          if (t._id === action.payload._id) {
            return action.payload
          } else {
            return t
          }
        })
      }
    }
  },
  [TODO_CREATE] (state, action) {
    if (action.error) {
      return state
    } else {
      return {
        ...state,
        list: [action.payload, ...state.list]
      }
    }
  },
  [TODO_REMOVE] (state, action) {
    if (action.error) {
      return state
    } else {
      return {
        ...state,
        list: state.list.filter((t) => {
          return t._id !== action.meta.todoId
        })
      }
    }
  }
}, {
  list: []
})
