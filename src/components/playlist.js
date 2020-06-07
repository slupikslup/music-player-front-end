import React, { useState } from "react";
import "../App.css";
import history from "../history";
const Playlist = (p) => {
  return (<>
    <div className="playlist-box">
      <i
        className="fa fa-play playlist-btn"
        onClick={() => history.push(`/playlist/${p.id}`)}
      />
      <p className="playlist-title">{p.title}</p>
    </div>
     
     </>
  );
};
export default Playlist;
