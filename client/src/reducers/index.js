import { combineReducers } from 'redux';
import maps from './reducer';
import auth from './auth';

export default combineReducers({
    auth,
    maps
});
