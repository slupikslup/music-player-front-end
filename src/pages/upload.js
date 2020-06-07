import React, { useState, ref, useEffect } from "react";
import history from "../history";
import tool from "../actionCreators/actions";

const UploadPage = () => {
  tool.setPlay(false);
  const [isMedia, setMedia] = useState("");
  const [isImage, setImage] = useState("");
  function onChangeFileMedia(e) {
    let file = e.target.files[0];
    console.log(file.size);
    if (file && file.type.slice(0, 5) == "audio" && file.size <= 20000000) {
      setMedia(file.name);
      let data = new FormData();
      data.append("media", file);
      fetch("/uploadmedia", {
        method: "POST",
        headers: localStorage.authToken
          ? { Authorization: "Bearer " + localStorage.authToken }
          : {},
        body: data,
      });
    } else if (file.type.slice(0, 5) != "audio") {
      alert("it must be audio file");
    } else if (file.size > 20000000) {
      alert("Choose file that file size less 20mb");
    }
  }
  function onChangeFileImg(e) {
    let file = e.target.files[0];

    if (file && file.type.slice(0, 5) == "image") {
      setImage(file.name);
      let data = new FormData();
      data.append("myImg", file);
      fetch("/upload", {
        method: "POST",
        headers: localStorage.authToken
          ? { Authorization: "Bearer " + localStorage.authToken }
          : {},
        body: data,
      });
    } else {
      alert("it must be image file");
    }
  }

  return (
    <div className="upload">
      {localStorage.authToken ? (<> <form
        action="/uploadmedia"
        acceptCharset="UTF-8"
        method="post"
        encType="multipart/form-data"
        className="custom-file mb-3"
      >
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customMedia"
            name="media"
            onChange={(e) => onChangeFileMedia(e)}
          />
          <label className="custom-file-label" htmlFor="custommedia">
            {isMedia ? `${isMedia}` : "Choose track"}
          </label>
        </div>
      </form>
      <form
        action="/upload"
        acceptCharset="UTF-8"
        method="post"
        encType="multipart/form-data"
        className="custom-file mb-3"
      >
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customImg"
            name="media"
            onChange={(e) => onChangeFileImg(e)}
          />
          <label className="custom-file-label" name="myImg" htmlFor="customImg">
            {isImage ? `${isImage}` : "Choose avatar"}
          </label>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-primary"
        style={{ "backgroundColor": "#671ca0" }}
        onClick={() => history.push("/")}
      >
        Go main
      </button></>)
      :
      <h3>
          You must be logged in to upload something
          <br />
          <a href="/login">Click here for login</a>
        </h3>
      }
     
    </div>
  );
};

export default UploadPage;
