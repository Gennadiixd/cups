import { ADD_COORDINATE } from './actionTypes'


let nextTodoId = 1
export const addCoordinateAC = coordinates => ({
    type: ADD_COORDINATE,
    payload: {
        id: ++nextTodoId,
        coordinates : coordinates,
    }
})