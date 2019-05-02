import {LOGOUT_USER, LOGIN_USER} from './actionTypes'

export const userLogin = (n,r) => ({type : LOGIN_USER, payload : {name : n, role : r}});
export const userLogout = () => ({type : LOGOUT_USER});