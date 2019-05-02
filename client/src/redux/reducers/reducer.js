import { ADD_COORDINATE } from '../actions/actionTypes'

const initialState = {
    coordinates: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_COORDINATE: {
            return Object.assign({}, state, { coordinates: [...state.coordinates, action.payload] })
        }
        default: {
            return state;
        }
    }
}