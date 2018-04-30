import { TODO_FETCH_LIST, TODO_UPDATE, TODO_CREATE, TODO_REMOVE } from '../types/todo'
import { createAction } from 'redux-actions'
import request from '../../utils/wx_request'

export const fetchList = createAction(TODO_FETCH_LIST, () => {
  return request.get('/')
})

export const updateTodo = createAction(TODO_UPDATE, (id, data) => {
  return request.put(`/${id}`, data)
})

export const createTodo = createAction(TODO_CREATE, (data) => {
  return request.post(`/`, data)
})

export const deleteTodo = createAction(TODO_REMOVE, (id) => {
  return request.delete(`/${id}`)
}, (id) => ({ todoId: id }))
