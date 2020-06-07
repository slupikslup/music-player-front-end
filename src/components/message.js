import React from "react";
import "../App.css";
import { useState, useEffect } from "react";

const Message = (type) => {
if(type === 'ADD_TO_MEDIA'){
    return (
        <div className="message-container">
            <i class="far fa-times-circle"></i>
        Track added to your tracks successfully
        </div>
    )
}else if(type === 'ADD_TO_PLAYLIST') {
    return (
        <div className="message-container">
        Track added to playlist successfully
        <i class="far fa-times-circle"></i>
        </div>
    )
}else if(type === 'DELETE_FROM_PLAYLIST'){
    return (
        <div className="message-container">
        Track deleted from playlist successfully
        <i class="far fa-times-circle"></i>
        </div>
    )
}else if(type === "PLAYLIST_CREATE"){
    return (
        <div className="message-container">
        Playlist created and track added
        <i class="far fa-times-circle"></i>
        </div>
    )
}else if (type === 'DELETE_FROM_MEDIA'){
    return (
        <div className="message-container">
        Deleted from your tracks
        <i class="far fa-times-circle"></i>
        </div>
    )
}
}
export default Message