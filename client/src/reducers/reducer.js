import { ADD_COORDINATE, DEL_TASK_FROM_REDUCER, ADD_TASK_TO_REDUCER, LOGOUT_USER, CHANGE_TASK_STATUS } from './actions/actionTypes'

const initialState = {
    coordinates: [{ mapCenter: [55.751574, 37.573856], id: 1 }],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_COORDINATE: {
            return Object.assign({}, state, { coordinates: [...state.coordinates, action.payload] })
        }
        case DEL_TASK_FROM_REDUCER: {
            return Object.assign({}, state, { coordinates: [...state.coordinates.filter((el) => el.id !== action.id)] })
        }
        case ADD_TASK_TO_REDUCER: {
            return Object.assign({}, state, { coordinates: [...state.coordinates, action.payload] })
        }
        case LOGOUT_USER: {
            return { coordinates: [{ mapCenter: [55.751574, 37.573856], id: 1 }], };
        }
        case CHANGE_TASK_STATUS: {
            console.log(action)
            return Object.assign({}, state, { coordinates: [...state.coordinates.map(el => 
                action.id === el.id ? { ...el, status: action.status} : el)]})
        }
        default: {
            return state;
        }
    }
}
