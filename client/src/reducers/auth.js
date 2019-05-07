import {LOGIN_USER, LOGOUT_USER} from './actions/actionTypes'

const initState = {
    username : '',
    userrole : '',
    isAuth : false,
    tasks : [],
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_USER :
            return  {...state,
            isAuth: true,
            userrole : action.payload.role,
            username : action.payload.name,
            tasks : action.payload.tasks,
        }
        case LOGOUT_USER :
            return {
                isAuth : false,
                userrole : '',
                username : '',                
            }
        default : return state
    }
}