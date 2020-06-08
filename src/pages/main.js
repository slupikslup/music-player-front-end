import React, {useState, useEffect} from 'react'
import "../App.css"
import CHeader from '../layout/header.js'
import Player from '../components/MainPlayer'
import store from '../reducers/store'  
import { Provider , connect} from 'react-redux';
import history from '../history'
import MiniPlayer from '../components/miniplayer'
import AddTo from '../components/addTo'

const Main =  p => {
 return  (<div className="mainContent-box">
{p.media}
  </div>)
}


const MainPage = () => {
  const [media, setMedia] = useState()
 
          useEffect(() => {
            var req = async () => {
              var promise = await fetch("/graphql" , {
                        method: 'post',
                        headers:  {
                           'Content-Type': 'application/json'
                         },
                         body: JSON.stringify({
                           query: `query media{
                    getAllMedia{
                                   artist,
                                   filename,
                                   title,
                                   id
                  }
                         }`
                         })
                    })
                  var res = await promise.json()
                  setMedia(() => {
                  return  res.data.getAllMedia.map((el, key) => <MiniPlayer key={key}  title={el.title} artist={el.artist} filename={el.filename} index={el.id} playlist={res.data.getAllMedia} indexInPlaylist={key}/>)
                  })
                  
                  // return null
          }
          req()
        }, [])
    return (<>
       
        <Main media={media}/>  
          </>
      )
    }

export default MainPage
