import {LOGIN_USER, LOGOUT_USER, ADD_TASK_TO_USER_REDUCER} from './actions/actionTypes'

const initState = {
    isAuth : false,
    tasks : [],
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_USER :
            return  {...action.user, tasks : action.tasks, isAuth : true}
        case LOGOUT_USER :
            return {
                isAuth : false
            }
        case ADD_TASK_TO_USER_REDUCER :
            return Object.assign({}, state, { tasks: [...state.tasks, action.task] })
        default : return state
    }
}