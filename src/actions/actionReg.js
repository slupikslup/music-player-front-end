import jwtDecode from "jwt-decode";
import actionLogin from "./actionLogin";
import store from "../reducers/store";
import {useState} from 'react'
const actionReg = async (login, password, e) => {
  e.preventDefault()
  var promise = await fetch("/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation reg{
                createUser(user: {username: "${login}", password: "${password}"}){
                    id
                }
            }`, 
    }),
  })
  var   result
  var res =  await promise.json()
  var data = res.data.createUser

  if(data == null ){
    result = 0
    store.dispatch({type:'LOGIN_STATUS' , status:'This username has already been used'})
  }else{
     actionLogin(login, password,e);
     result = 1
     console.log(data)
  }
 
 return result
};
export default actionReg;
