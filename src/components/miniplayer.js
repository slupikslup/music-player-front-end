import React from "react";
import "../App.css";
import { useState } from "react";
import store from "../reducers/store";
import { connect } from "react-redux";
import AddTo from "../components/addTo";
import tool from "../actionCreators/actions";
const deleteFromPlaylist = async (playlistID, songID) => {
  await fetch("/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.authToken,
    },
    body: JSON.stringify({
      query: `mutation media{
        deleteFromPlaylist(playlistId: "${playlistID}" , trackId: "${songID}")
   }`,
    }),
  });
  alert("Track was deleted");
  window.location.reload(true);
};

const addToMedia = async (mediaId) => {
  var promise = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.authToken,
    },
    body: JSON.stringify({
      query: `mutation addToMedia {
            addToMedia(media: "${mediaId}")
            }
            `,
    }),
  });
};
const deleteFromMedia = async (mediaId) => {
  var promise = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.authToken,
    },
    body: JSON.stringify({
      query: `mutation addToMedia {
            deleteFromMedia(mediaId: "${mediaId}")
            }
            `,
    }),
  });
  alert("Track was deleted");
  window.location.reload(true);
};

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

const MiniPlayer = ({
  title,
  artist,
  filename,
  index,
  playlist,
  indexInPlaylist,
  currentTime,
  id,
  shuffle,
  isplaying,
  playlistId,
  current
}) => {
  const [adding, setAdding] = useState(false);
  const [duration, setDuration] = useState();
  // (async () => await tool.noshuffle(playlist))()
  const play = async () => {
    if (id == index) {
      tool.play();
      simulateKey(13);
    } else if (id != index) {
      // await tool.noshuffle(p.playlist)
      await tool.playlist(playlist);
      console.log(playlist);
      await tool.pause();
      await tool.playTrack(indexInPlaylist, index);
      await tool.play();
      tool.loadMetadata(duration);
      tool.setPlay(true);
      simulateKey(220);
    }
  };
  const audio = new Audio(`/song/${filename}`);
  audio.onloadedmetadata = (e) => {
    setDuration(
      `${parseInt(e.target.duration / 60)}:${
        Math.round(e.target.duration) % 60 < 10
          ? "0" + (Math.round(e.target.duration) % 60)
          : Math.round(e.target.duration) % 60
      }`
    );
  };
  const pause = () => {
    tool.pause();
  };
  if (current == indexInPlaylist && id == index) {
    tool.loadMetadata(duration);
  }
  return (
    <div className="miniPlayer-box">
      {/* //&& p.current == p.indexInPlaylist */}
      {isplaying && id == index ? (
        <span
          className="fa fa-pause miniplayer-btn"
          id={`${index}-pause`}
          onClick={async (e) => {
            pause();
            simulateKey(13);
          }}
        />
      ) : (
        <span
          id={`${index}-play`}
          className="fa fa-play miniplayer-btn"
          onClick={(e) => {
            play();
            // simulateKey(13);
          }}  
        />
      )}
      <p className="track-artist">
   {artist != null ? `${artist}` : 'No artist name'}
      </p>
      <p className="track-title">
      {title != null ? `${title}` : 'No title'}
      </p>
      <div className="miniplayer-tools">
        <a
          href={`/download/${filename}`}
          className="miniplayer-tool"
        >
          <i
            className="fa fa-arrow-circle-down fa-ico "
    
          />
        </a>
        {localStorage.authToken ? (
          <>
            <i
              className="fa fa-list-ul fa-ico miniplayer-tool"
              onClick={() => setAdding(!adding)}
              
            />
          </>
        ) : (
          []
        )}
        {localStorage.authToken && window.location.pathname !== "/tracks" ? (
          <i
            className="fa fa-plus-circle fa-ico miniplayer-tool"
         
            onClick={() => addToMedia(index)}
          />
        ) : (
          []
        )}
        {/* //p.indexInPlaylist == p.current &&  p.id == p.index || */}
        {window.location.pathname == "/tracks" ? (
          <i
            className="fa fa-times miniplayer-tool"
            style={{ "margin-left": "10px", "font-size": "20px" }}
            onClick={() => deleteFromMedia(index)}
          />
        ) : (
          []
        )}
        {playlistId ? (
          <i
            className="fa fa-times miniplayer-tool"
            style={{ "margin-left": "10px", "font-size": "20px" }}
            onClick={() => deleteFromPlaylist(playlistId, index)}
          />
        ) : (
          []
        )}
       
     
      </div>
      {id == index ? (
          <i
            className="miniplayer-tool-duration"
            style={{ "marginLeft": "10px" ,float:'right'}}
          >{`${currentTime}/${duration}`}</i>
        ) : (
          <i
            className="miniplayer-tool-duration"
            style={{ "marginLeft": "10px" ,float:'right'}}
          >{`${duration}`}</i>
        )}
      {adding ? <AddTo songID={index} /> : null}
    </div>
  );
};
const CMiniPlayer = connect((s) => {
  return {
    currentTime: s.trackChange.currentTime,
    isplaying: s.trackChange.isPlaying,
    id: s.trackChange.playingTrack.id,
    shuffle: s.trackChange.shuffle,
    current: s.trackChange.playingTrack.index
  };
})(MiniPlayer);
export default CMiniPlayer;
