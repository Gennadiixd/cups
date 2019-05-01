import { ADD_COORDINATE } from '../actions/actionTypes'

const initialState = {
    coordinates: [{id : 0, coordinates : [55.684758, 37.738521]}],
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