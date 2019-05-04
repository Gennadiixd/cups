import { ADD_COORDINATE } from '../actions/actionTypes'

const initialState = {
    coordinates: [{mapCenter :  [55.751574, 37.573856],}],
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