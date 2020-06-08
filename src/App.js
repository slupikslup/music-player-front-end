import React from 'react'
import {Router, Route, Link, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import "./App.css"
import {useState, useRef} from 'react'
import Mainpage from './pages/main'
import { createStore, applyMiddleware } from 'redux';
import { Provider , connect} from 'react-redux';
import thunk from 'redux-thunk';
import UploadPage from './pages/upload.js'
import LoginPage from './pages/login'
import history from './history'
import store from './reducers/store'
import PlaylistsPage from './pages/playlists'
import addedTracksPage from './pages/addedTracks'
import AddTo from './components/addTo'
import PlaylistPage from './pages/playlist'
import Player from './components/MainPlayer'
import Header from './layout/header'
store.dispatch({type: "CHECK_LOGIN"})

const player = ({isItPlayed}) => {
   if(isItPlayed){
       return <Player/>
   }else {
       return null
   }
}
const CPlayer  = connect( s => {return  {isItPlayed: s.trackChange.isItPlaying} } )(player)
const App = () => {
     return (
    <Provider store={store}>
    <Router  history={history}>
    <Header/> 
       <Switch>
            <Route path="/uploadfile" component={UploadPage}  exact/>
    <Route path="/" component={Mainpage} exact/>
    <Route path="/playlists" component={PlaylistsPage} exact/>
    <Route path="/login" component={LoginPage} exact/>
    <Route path="/tracks" component={addedTracksPage} exact/>
    <Route path="/playlist/:playlist" component={PlaylistPage} exact/>
    </Switch>
    </Router>
    <CPlayer/>
    </Provider>
    )

   
}
export default App
