import React from "react";
import "../App.css";
import { useState, useEffect , createRef} from "react";
import store from "../reducers/store";
import { connect } from "react-redux";
import history from "../history";
import AddTo from "./addTo";
import tool from "../actionCreators/actions";

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


const Player = ({
  playlist,
  current,
  isplaying,
  shuffle,
  duraTion,
  currentId,
  noshuffle,
}) => {
  const [audio, setAudio] = useState();
  const [isRepeat, setRepeat] = useState("black");
  const [duration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [progress, setProgress] = useState();
  const [volume, setVolume] = useState(50);
  const [adding, setAdding] = useState(false);
 
  window.onkeydown = function (e) {
    if (e.keyCode == 13 && isplaying) {
      tool.pause();
      audio.pause();
    } else if (e.keyCode == 13 && !isplaying) {
      tool.play();
      audio.play();
    }
    if (e.keyCode == 39) {
      next();
    }
    if (e.keyCode == 37) {
      back();
    }
    // if (e.keyCode == 38) {
    //   if (audio.volume <= 0.9) {
    //     audio.volume = audio.volume + 0.1;
    //     setVolume(audio.volume);
    //   }
    // }
    // if (e.keyCode == 40) {
    //   if (audio.volume >= 0.1) {
    //     audio.volume = audio.volume - 0.1;
    //     setVolume(audio.volume);
    //   }
    // }
    if(e.keyCode == 	220){
      audio.pause()
      tool.pause()
      audio.src = `/song/${playlist[current].filename}`
      audio.play()
      tool.play()
    }
  };

  function shuffleFunc(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  const doPlayer = () => {
    if ((playlist && current) || current === 0) {
      const audio = new Audio(
        `/song/${playlist[current].filename}`
      );

      audio.load();
      audio.autoplay = false;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
        audio.volume = 0.5;
      };
      audio.ontimeupdate = (e) => {
        setCurrentTime(e.target.currentTime);
        const cur = `
${parseInt(e.target.currentTime / 60)}:${
          Math.round(e.target.currentTime) % 60 < 10
            ? "0" + (Math.round(e.target.currentTime) % 60)
            : parseInt(e.target.currentTime) % 60
        }`;
        tool.updataTime(cur);
        var barSize
        if( document.getElementById("bar")){
          barSize =  document.getElementById("bar").offsetWidth
          console.log(barSize)
        }
          setProgress(
            parseInt((e.target.currentTime * barSize) / e.target.duration)
          );
        if (audio.ended && !audio.loop && current != playlist.length - 1) {
          current = current + 1;
          e.target.src = `/song/${playlist[current].filename}`;
          tool.playTrack(current, playlist[current].id);
          e.target.play();
          tool.play();
        } else if (
          audio.ended &&
          !audio.loop &&
          current == playlist.length - 1
        ) {
          current = 0;
          e.target.src = `/song/${playlist[current].filename}`;
          tool.playTrack(current, playlist[current].id);
          e.target.play();
          tool.play();
        } else if (audio.ended) {
          setProgress(0);
          setCurrentTime(0);
        }
      };
      setAudio(audio);
      audio.play();
      tool.play();
   
    }
  }
  useEffect(() => doPlayer(), []);

  const play = () => {
    tool.play();
    audio.play();
  };
  const pause = () => {
    tool.pause();
    audio.pause();
  };


  const clickOnBar = (e) => {
    var barSize
    if( document.getElementById("bar")){
      barSize =  document.getElementById("bar").offsetWidth
    }
    if (!audio.ended) {
      var mouseX = e.pageX - document.getElementById("bar").offsetLeft;
      console.log(document.getElementById("bar").offsetLeft)
      setProgress(mouseX);
      var time = (mouseX * duration) / barSize;
      audio.currentTime = time;
    }
  };
  const next = () => {
    if (current == playlist.length - 1) {
      current = 0;
      tool.playTrack(current, playlist[current].id);
      audio.src = `/song/${playlist[current].filename}`;
      tool.play();
      audio.play();
    } else {
      tool.playTrack(current + 1, playlist[current + 1].id);
      audio.src = `/song/${
        playlist[current + 1].filename
      }`;
      tool.play();
      audio.play();
    }
  };

  const back = () => {
    if (current == 0) {
      current = playlist.length - 1;
      tool.playTrack(current, playlist[current].id);
      audio.src = `/song/${playlist[current].filename}`;
      tool.play();
      audio.play();
    } else {
      tool.playTrack(current - 1, playlist[current - 1].id);
      audio.src = `/song/${
        playlist[current - 1].filename
      }`;
      tool.play();
      audio.play();
    }
  };
  const doShuffle =async () => {
   if(shuffle){
     await tool.shuffle()
     console.log('noshuffle' ,noshuffle)
   }else{
     await tool.shuffle()
     await tool.playlist(shuffleFunc(playlist))
     console.log('playlist', playlist)
   }
  };
  return (
    <>
      <div
        className="player-box"
        style={{ display: current || current == 0 ? "block" : "none" }}
      >
        <div className="MainPlayer">
          <div className="mainplayer-tools">
          <i className="fa fa-backward  player-btn" onClick={back} />
          {isplaying
            ?  (
                <span onClick={pause} className="fa fa-pause player-btn" />
              )
            :  (
                <span onClick={play} className="fa fa-play player-btn" />
              )}

          <i className="fa fa-forward player-btn" onClick={next} />
          <i
            className="fa fa-random player-btn"
            style={{ color: shuffle ? "#671ca0" : "black" }}
            onClick={doShuffle}
          />
          <i
            className="fa fa-refresh player-btn"
            onClick={() => {
              if (isRepeat === "#671ca0") {
                audio.loop = false;
                setRepeat("black");
              } else if (isRepeat === "black") {
                audio.loop = true;
                setRepeat("#671ca0");
              }
            }}
            style={{ color: isRepeat }}
          />
          </div>
          <div className='control-time'>
          <i className="player-btn">0:00</i>
          <div className="bar1" onClick={clickOnBar} id="bar">
            <div className="progress1" style={{ width: `${progress}px` }}></div>
          </div>

          <i className="duration">
            {playlist
              ? `${parseInt(currentTime / 60)}:${
                  Math.round(currentTime) % 60 < 10
                    ? "0" + (Math.round(currentTime) % 60)
                    : parseInt(currentTime) % 60
                }/${duraTion}`
              : `0:00/0:00`}
          </i>
          </div>
          <div className="controlVolAndInfo">
          <div className="volumer">
            <input
              type="range"
              id="volume"
              min="0"
              max="100"
              onChange={(e) => {
                audio.volume = e.target.value * 0.01;
                setVolume(e.target.value);
              }}
              className="volume-range slider"
            />

            {audio ? (
              <i
                className={
                  audio.volume == 0
                    ? "fa fa-volume-off" + " player-btn volume-btn"
                    : "fa fa-volume-up" + " player-btn volume-btn"
                }
                onClick={() => {
                  if (audio.volume > 0) {
                    setVolume(audio.volume);
                    audio.volume = 0;
                  } else {
                    audio.volume = volume;
                  }
                }}
              />
            ) : (
              []
            )} 
            
       
          </div>
          {(playlist && current) || current === 0 ? (
            <div className="song-info">
              {playlist[current].artist != null &&
              playlist[current].title != null ? (
                <>
                  <p className="inf-artist">{playlist[current].artist}</p>
                  <p className="inf-title">
                    {playlist[current].title}
                  </p>
                </>
              ) : playlist[current].title == null &&
                playlist[current].artist != null ? (
                <>
                  <p className="inf-artist">{playlist[current].artist}</p>
                  <p className="inf-title">No title</p>
                </>
              ) : playlist[current].artist == null &&
                playlist[current].title != null ? (
                <>
                  <p className="inf-artist">No artist name</p>
                  <p className="inf-title">
                    {playlist[current].title.slice(0, 38)}
                  </p>
                </>
              ) : (
                <>
                  <p className="inf-artist">No artist name</p>
                  <p className="inf-title">No title</p>
                </>
              )}
            </div>
          ) : (
            []
          )}
          {localStorage.authToken ? (
            <>
              <i
                className="fa fa-list-ul fa-ico list"
                onClick={() => setAdding(!adding)}
                style={{ "margin-left": "10px"}}
              />
            </>
          ) : (
            []
          )}
          </div>
        </div>
      </div>
      {adding ? <AddTo songID={playlist[current].id} /> : null}
    </>
  );
};

const CPlayer = connect((s) => {
  // console.log(`noshuffle`,  s.trackChange.noshuffle)
  // console.log('index',s.trackChange.playingTrack.index, 'id', s.trackChange.playingTrack.id)
  return {
    playlist: s.trackChange.playlist,
    current: s.trackChange.playingTrack.index,
    isplaying: s.trackChange.isPlaying,
    shuffle: s.trackChange.shuffle,
    duraTion: s.trackChange.duration,
    toggleStop: s.trackChange.doToggleStop,
    currentId: s.trackChange.playingTrack.id,
    noshuffle: s.trackChange.noshuffle,
  };
})(Player);

export default CPlayer;
