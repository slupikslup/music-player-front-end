import history from '../history'
import jwtDecode from 'jwt-decode'
import store from '../reducers/store'
const actionLogin = async (login, password, e) => {
     e.preventDefault()
     var promise = await fetch("/graphql" , {
         method: 'post',
         headers:  {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `query login{
                login(username: "${login}", password: "${password}")
            }`
          })
     })
     var result
     var res = await promise.json()
     var data = res.data.login 
     if(data == null){
     store.dispatch({type:'LOGIN_STATUS' , status:'Your data is not correct or such user does not exist'})
     result = 0
     }else{
      store.dispatch({type: "LOGIN", token: data})
      result = 1
    }
    return result
}
export default actionLogin