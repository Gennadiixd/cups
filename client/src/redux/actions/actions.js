import { ADD_COORDINATE } from './actionTypes'


let nextTodoId = 1
export const addTodoAC = coordinate => ({
    type: ADD_COORDINATE,
    payload: {
        id: ++nextTodoId,
        coordinate,
    }
})