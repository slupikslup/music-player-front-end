import React, {useState, useEffect} from 'react'
import "../App.css"
import CHeader from '../layout/header.js'
import Player from '../components/MainPlayer'
import store from '../reducers/store'  
import { Provider , connect} from 'react-redux';
import history from '../history'
import MiniPlayer from '../components/miniplayer'


const Main =  p => {
 return  (<div className="mainContent-box">
{p.media == undefined ? <h3>
          You must be logged in to upload something
          <br />
          <a href="/login">Click here fo login</a>
        </h3>
        : p.media }
  </div>)
}


const AddedTracksPage = p => {
  const [media, setMedia] = useState()
  var req = async () => {
    var promise = await fetch("/graphql" , {
              method: 'post',
              headers:  {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + localStorage.authToken
               },
               body: JSON.stringify({
                 query: `query media{
                    getUserMedia(id: "${p.id}"){
                         artist,
                         filename,
                         title,
                         id
        }
               }`
               })
          })
        var res = await promise.json()
        console.log(res)
  if(p.id){
    if(res.data.getUserMedia.length === 0){
      setMedia(<h2>You dont have any added tracks</h2>)
    }    else{
        setMedia(() => {
        return  res.data.getUserMedia.map((el, key) => <MiniPlayer  key={key} title={el.title} artist={el.artist}  filename={el.filename} index={el.id} playlist={res.data.getUserMedia} indexInPlaylist={key}/>)
        })
      }
 }   
  }
  useEffect(() => req(), [])
    return (<>
        
        <Main media={media}/>
        <Player/>
          </>
      )
}

const CAddedTracksPage = connect((s) => { return { id: s.login.id}})(AddedTracksPage)

export default CAddedTracksPage

