import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Message from './message'

const CheckBox = (p) => {
  const [checked, setChecked] = useState();
  const onChange = async (e, playlistID, songID) => {
    if(checked === false){
      setChecked(true)
      await fetch("/graphql", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.authToken,
        },
        body: JSON.stringify({
          query: `query media{
           addToPlaylist(playlistId: "${playlistID}" , trackId: "${songID}")
       }`,
        }),
      })
    }else if(checked === true){
      setChecked(false)
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
      })
    }
  };
  const check = async (playlistID, songID) => {
    var promise = await fetch("/graphql" , {
      method: 'post',
      headers:  {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + localStorage.authToken
       },
       body: JSON.stringify({
         query: `query media{
          isitInPlaylist(playlistId: "${playlistID}", trackId: "${songID}")
       }`
       })
       
  })
  var res = await promise.json()
    setChecked(() => res.data.isitInPlaylist)
  console.log(checked)
  };
  useEffect(() => check(p.playlistID, p.songID), [])
  if(checked || checked === false){
    return (
      <label className="checkbox-container" style={{ "font-size": "15px" }}>
  {p.title}
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e, p.playlistID, p.songID)}
    style={{ "font-size": "15px" }}
  />
  <span className="checkmark" style={{ "font-size": "15px" }}></span>
</label>
);
  }else {
  return   null
  }
 
};
export default CheckBox;
