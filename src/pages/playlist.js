import React from 'react'
import {useState, useEffect} from "react"
import "../App.css"
import Header from '../layout/header'
import history from '../history'
import {connect} from 'react-redux'
import store from '../reducers/store'
import CHeader from '../layout/header.js'
import MiniPlayer from '../components/miniplayer'

const Main =  p => {
    return  (<div className="mainContent-box">
   {p.media}
     </div>)
   }

const PlaylistPage = p => {
    const [media, setMedia] = useState()
    var req = async () => {
      if(localStorage.authToken){
        var promise = await fetch("/graphql" , {
          method: 'post',
          headers:  {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + localStorage.authToken
           },
           body: JSON.stringify({
             query: `query media{
              getTracksFromPlaylist(id: "${p.match.params.playlist}"){
filename,
id,
title,
artist
}
           }`
           })
      })
          var res = await promise.json()
          console.log(res)
          if(res.data.getTracksFromPlaylist != null ){
            if( res.data.getTracksFromPlaylist.length !== 0){
              setMedia(() => {
                return  res.data.getTracksFromPlaylist.map((el, key) => <MiniPlayer key={key} title={el.title} playlistId={p.match.params.playlist} artist={el.artist} filename={el.filename} index={el.id} playlist={res.data.getTracksFromPlaylist} indexInPlaylist={key}/>)
                })
            }else if(res.data.getTracksFromPlaylist.length == 0){
              setMedia(<h3>Noone track in this playlist</h3>)
            }
          }else if(res.data.getTracksFromPlaylist == null){
            setMedia(<h3>You dont have permissions for this playlist</h3>)
          }
      }else{
        setMedia(<h3>
          You must be logged in to check playlist
          <br />
          <a href="/login">Click here for login</a>
        </h3>)
      }
                       }
              useEffect(() => req(), [])
return (<div>
    
        <Main media={media}/>
</div>)
}
export default PlaylistPage