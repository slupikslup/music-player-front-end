import React, { useState, useEffect } from 'react'
import {Router, Route, Link} from 'react-router-dom';
import "../App.css"
import {connect} from 'react-redux'
import store from '../reducers/store'
import history from '../history'
import MiniSearchPlayer from '../components/minisearchplayer'


const Header = p => {
    const [ava, setAva] = useState()
    const [checked, setChecked] = useState()
    var req = async () => {
        if(p.id){
var promise = await fetch('/graphql', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
        query: `query getImg {
            getUserAvatar(id: "${p.id}"){
              filename
            }
            }
            `
    })
})
var data = await promise.json()
    setAva(<img src={`/img/${data.data.getUserAvatar.filename}`}/>)
    console.log(data)
}
}
   const [searchData, setData] = useState()
   const search = async (text) => {
       if(text.length > 0){
    var promise = await fetch("/graphql" , {
        method: 'post',
        headers:  {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           query: `query search{
              search(text: "${text}"){
                  filename,
                  artist,
                  title, 
                  id
              }
           }`
         })
    })
    var res = await promise.json()
    setData(() => {
        return  res.data.search.map((el, key) => <MiniSearchPlayer key={key} title={el.title} artist={el.artist} filename={el.filename} index={el.id} playlist={res.data.search} indexInPlaylist={key}/>)
        })
    console.log(searchData)
}else {
    setData(null)
}
   }
   useEffect(()  => req(), [])
    return (
<div className="header-box">
    <div className="header">
  
   <nav className="menu">  
   <input id="menu__toggle" type="checkbox" onChange={(e) => setChecked(e.target.checked)}/>
  <label className="menu__btn" htmlFor="menu__toggle">
    
    {checked ? <i className="fa fa-times-circle" style={{color: 'white','fontSize' : '30px'}}></i> : <i className="fa fa-align-justify" style={{'fontSize' : '20px'}}></i>}
  </label>
  <a href="/" className="header-logo" >SoundOn<i className="fa fa-headphones " /></a>
  <ol className="header-menu">
       <li><Link to="/">Main</Link></li>
       <li><Link to="/playlists">Playlists</Link></li>
       <li><Link to="/uploadfile">Upload</Link></li>
       <li><Link to="/tracks">Tracks</Link></li> 
   </ol>
 
   <div className="search-box">
  <input type='search' className="header-search" placeholder="Search something..." onChange={(e) => search(e.target.value)}/>
  {searchData ? <div className="search-res-box">{searchData}</div>: []}
   <i className="fa fa-search"/>
  </div>
  
  {localStorage.authToken && p.id  ? <div className="header-user" >
      {ava}
    <p>{p.username}</p>
    <i className="fa fa-sign-out logout" onClick={() => {store.dispatch({type: "LOGOUT"}); window.location.reload(false)}}/>
  </div> :<Link to="/login" className="login-link header-user">Login</Link>}

   </nav>

   </div>
</div>
)
    }

    const CHeader = connect((s) => {  return {username: s.login.username, id: s.login.id}})(Header)
    export default CHeader
    