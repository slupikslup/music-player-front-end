import React from "react";
import "../App.css";
import { useState } from "react";
import store from "../reducers/store";
import { connect } from "react-redux";
import AddTo from "../components/addTo";
import tool from '../actionCreators/actions'
function simulateKey(keyCode, type, modifiers) {
  var evtName = typeof type === "string" ? "key" + type : "keydown";
  var modifier = typeof modifiers === "object" ? modifier : {};

  var event = document.createEvent("HTMLEvents");
  event.initEvent(evtName, true, false);
  event.keyCode = keyCode;

  for (var i in modifiers) {
    event[i] = modifiers[i];
  }

  document.dispatchEvent(event);
}

const MiniSearchPlayer = (p) => {
  const [duration, setDuration] = useState();
  const play = async() => {
    if( p.id == p.index ){
      tool.play() 
      simulateKey(13);
      tool.noshuffle()
    }else{
      await tool.playlist(p.playlist)
      console.log(p.playlist)
      await tool.pause()
      await tool.playTrack(p.indexInPlaylist,p.index)
      await   tool.play()
     tool.loadMetadata(duration)
     tool.setPlay(true)
      console.log(p.indexInPlaylist ,p.current)
      simulateKey(	220)
    }
  };
  const pause = () => {
   tool.pause()
  };
  const audio = new Audio(`/song/${p.filename}`);
  audio.onloadedmetadata = (e) => {
    setDuration(
      `${parseInt(e.target.duration / 60)}:${
        Math.round(e.target.duration) % 60 < 10
          ? "0" + (Math.round(e.target.duration) % 60)
          : Math.round(e.target.duration) % 60
      }`
    );
  };
  if (p.current == p.indexInPlaylist && p.id == p.index) {
  tool.loadMetadata(duration)
  }
  return (
    <div className="search-res">
      {p.isplaying  && p.id == p.index ? (
        <span
          style={{ "margin-left": "5px" }}
          className="fa fa-pause player-btn"
          onClick={ (e) => {
            pause();
            simulateKey(13);
          }}
        />
      ) : (
        <span
          style={{ "margin-left": "5px" }}
          onClick={(e) => {
            play();
         
          }}
          className="fa fa-play player-btn"
        />
      )}
      <p display="inline-block" className='searchP'>{p.artist != null && p.title != null ? `${p.artist} - ${p.title} `: (p.title == null && p.artist != null ? `${p.artist} - no title` : ( p.artist == null && p.title != null ?  `No artist name - ${p.title}` :`No artist name - no title` )) }</p>
    </div>
  );
};

const CMiniSearchPlayer = connect((s) => {
  return {
    current: s.trackChange.playingTrack.index,
    isplaying: s.trackChange.isPlaying,
    id: s.trackChange.playingTrack.id,
  };
})(MiniSearchPlayer);
export default CMiniSearchPlayer;
