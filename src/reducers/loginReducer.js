import jwt from 'jwt-decode'
import store from './store'
const loginRegLogoutReducer = (state, action) => {
    if (!state){
        return {
            loginStatus: ''
        }
    }
    if(localStorage.authToken && action.type == "CHECK_LOGIN" && localStorage.authToken  !== null){
        let  user = jwt(localStorage.authToken)
        return  {...state , username: user.username, id: user.sub, birthday: user.birthday}
    }
    if(action.type == 'LOGIN'){
        let user = jwt(action.token)
        localStorage.setItem('authToken', `${action.token}`)
        return  {...state, username: user.username, id: user.sub, birthday: user.birthday}
    }
    if(action.type == 'LOGOUT'){
        localStorage.removeItem('authToken')
    }
    if(action.type == 'LOGIN_STATUS'){
        return {...state , loginStatus: action.status}
    }
    return state
}

export default loginRegLogoutReducer