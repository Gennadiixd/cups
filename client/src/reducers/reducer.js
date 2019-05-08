import { ADD_COORDINATE, DEL_TASK_FROM_REDUCER } from './actions/actionTypes'

const initialState = {
    coordinates: [{mapCenter :  [55.751574, 37.573856],}],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_COORDINATE: {
            return Object.assign({}, state, { coordinates: [...state.coordinates, action.payload] })
        }
        case DEL_TASK_FROM_REDUCER: {
            return Object.assign({}, state, {coordinates : [...state.coordinates.filter((el)=>el.id !== action.id)]})
        }
        default: {
            return state;
        }
    }
}
