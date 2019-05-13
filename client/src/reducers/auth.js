import {
    LOGIN_USER,
    LOGOUT_USER,
    ADD_TASK_TO_USER_REDUCER,
    DEL_TASK_FROM_USER_REDUCER,
    MAKE_TASK_PENDING,
    CHANGE_TASK_STATUS
} from './actions/actionTypes'

const initState = {
    isAuth : false,
    tasks : [],
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_USER :
            return  {...action.user, tasks : action.tasks ? action.tasks : [], isAuth : true}
        case LOGOUT_USER :
            return {isAuth : false}
        case ADD_TASK_TO_USER_REDUCER :
            return Object.assign({}, state, { tasks: [...state.tasks, action.task] })
        case DEL_TASK_FROM_USER_REDUCER :
            return Object.assign({}, state,
                { activeTasks: [...state.activeTasks.filter(task => task!==action.taskid)] },
                { tasks : [...state.tasks.filter(task => task._id!==action.taskid)]})
        case MAKE_TASK_PENDING :
            return Object.assign({}, state, { tasks : [...state.tasks.map(el => action.id === el._id ? { ...el, status: 'pending' } : el)]})
        case CHANGE_TASK_STATUS: {
            return Object.assign({}, state, { tasks: [...state.tasks.map(el =>
                    action.id === el._id ? { ...el, status: action.status} : el)]})
        }
        default : return state
    }
}