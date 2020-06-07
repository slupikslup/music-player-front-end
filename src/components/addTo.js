import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import store from "../reducers/store";
import Player from "./MainPlayer";
import { connect } from "react-redux";
import CheckBox from "../components/checkbox";

const closeIt = (id) => {
  const it = document.getElementById(id);
  it.parentNode.removeChild(it);
};

const createPlaylist = async (title, trackId) => {
  const promise = await fetch("/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.authToken,
    },
    body: JSON.stringify({
      query: `mutation playlist{
         createPlaylist(playlist: {title: "${title}"}){
           id
         }
     }`,
    }),
  });
  var res = await promise.json();
  console.log(res.data.createPlaylist.id);
  await fetch("/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.authToken,
    },
    body: JSON.stringify({
      query: `query media{
       addToPlaylist(playlistId: "${res.data.createPlaylist.id}" , trackId: "${trackId}")
   }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  closeIt("addToPlaylist");
};

const CreatePlaylist = ({ songId }) => {
  var [title, setTitle] = useState("");
  return (
    <div>
      
      <input
        type="text"
        className="form-control create-playlist"
        aria-describedby="playlist"
        value={title}
     
        onChange={(e) => setTitle(e.target.value)}
      />
       <button
        disabled={title.length > 1 ? false : true}
        onClick={() => createPlaylist(title, songId)}
        style={{'display': 'inline-block', 'background-color': '#671ca0', 'margin-left': '20px'}}
        className="btn btn-primary"
      >
        Create
      </button>
      <small class="form-text text-muted" style={{'font-size': '10px'}}>
        Type your playlist name here
      </small>
     
    </div>
  );
};

const AddTo = (p) => {
  const [playlists, setPlaylists] = useState();
  const [isCreating, setCreating] = useState(false);
  var req = async () => {
    var promise = await fetch("/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
      },
      body: JSON.stringify({
        query: `query media{
                  getPlaylists(id: "${p.id}"){
                        title,
                        id
       }
              }`,
      }),
    });
    var res = await promise.json();
    console.log(res);
    if (p.id) {
      console.log(res);
      setPlaylists(() => {
        return res.data.getPlaylists.map((el) => <CheckBox title={el.title} playlistID={el.id} songID={p.songID}/>);
      });
    }
  };
  useEffect(() => req(), []);
  console.log(p.songID);

  return (
    <div id="addToPlaylist">
      <div
        className="addTo-background"
        onClick={() => closeIt("addToPlaylist")}
      ></div>
      <div className="playlist-option-box">
        <div className="addTo-header">
          <div className="addTo-title" style={{ display: "inline-block" }}>
            Add to ...
          </div>
          <i
            class="fa fa-times addTo-cross"
            onClick={() => closeIt("addToPlaylist")}
            style={{ display: "inline-block" }}
          ></i>
        </div>
        <div className="addTo-check">{playlists}</div>
        <div className="addTo-createPlaylist">
          <label
            onClick={() => {
              closeIt("createPlaylist");
              setCreating(true);
            }}
            id="createPlaylist"
          >
            <i class="fa fa-plus" style={{ "font-size": "23px" }} />{" "}
            <a className="createPlaylist">Create new playlist</a>
          </label>
          {isCreating ? <CreatePlaylist songId={p.songID} /> : null}
        </div>
      </div>
    </div>
  );
};
const CAddTo = connect((s) => {
  
  return { id: s.login.id };
})(AddTo);
export default CAddTo;
