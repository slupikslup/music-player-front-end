import React, { useState, useEffect } from "react";
import CHeader from "../layout/header";
import MainPlayer from "../components/MainPlayer";
import MiniPlayer from "../components/miniplayer";
import Playlist from "../components/playlist";
import { Provider, connect } from "react-redux";

const Main = (p) => {
  console.log(p.playlists);
  return (
    <div>
      {!localStorage.authToken ? (
         <div className="playlists-box">
        <h3>
          You must be logged in to check your playlists
          <br />
          <a href="/login">Click here for login</a>
        </h3>
        </div>
      ) : (
        <div className="playlists-box">
          <ul className="playlists">{p.playlists}</ul>
        </div>
      )}
    </div>
  );
};

const PlaylistsPage = (p) => {
  const [playlists, setPlaylists] = useState();
  async function req() {
    if (p.id) {
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
      if (!res.errors && res.data.getPlaylists != undefined) {
        console.log(res);
        setPlaylists(() => {
          return res.data.getPlaylists.map((el, key) => (
            <li key={key}>
              <Playlist  title={el.title} id={el.id} />
            </li>
          ));
        });
      }
    }
  }
  useEffect(() => { 
    req();   
  },[]);
 return (
    <>
      <CHeader />
      <Main playlists={playlists} />
    </>
  );
};

const CPlaylistsPage = connect((s) => {
  console.log(s);
  return { id: s.login.id };
})(PlaylistsPage);

export default CPlaylistsPage;
