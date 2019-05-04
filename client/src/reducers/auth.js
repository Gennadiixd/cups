import {LOGIN_USER, LOGOUT_USER} from './actionTypes'

const initState = {
    username : '',
    userrole : '',
    isAuth : false
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_USER :
            return  {...state,
            isAuth: true,
            userrole : action.payload.role,
            username : action.payload.name}
        case LOGOUT_USER :
            return {
                isAuth : false,
                userrole : '',
                username : ''
            }
        default : return state
    }
}