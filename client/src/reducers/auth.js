import {LOGIN_USER, LOGOUT_USER, ADD_TASK_TO_USER_REDUCER, DEL_TASK_FROM_USER_REDUCER} from './actions/actionTypes'

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
        default : return state
    }
}