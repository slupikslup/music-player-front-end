import store from '../reducers/store'

export default  {
    play : () => {
        store.dispatch({type: "PLAY"})
        },
        pause : () => {
            store.dispatch({type: "PAUSE"})
        },
         playlist : (playlist = []) => {
            store.dispatch({type:'SET_PLAYLIST' , playlist: playlist})
        },
         loadMetadata : (duration = "") => {
            store.dispatch({ type: "LOAD_METADATA", duration: duration });
        },
         updataTime : (currentTime = "") => {
            store.dispatch({ type: "CURRENT_TIME", currentTime: currentTime });
        },
         playTrack : (trackIndex  , id ) => {
            store.dispatch({ type: "PLAY_TRACK", index:  trackIndex, id: id});
        },
         shuffle : () => {
            store.dispatch({ type: "SHUFFLE" });
        },
         setPlay : (boolean) => {
            store.dispatch({ type: "SET_PLAYER_PLAY", isItPlaying: boolean });
        },
        noshuffle : (playlist = []) => {
            store.dispatch({type:'SET_NOSHUFFLE_PLAYLIST' , noshuffle: playlist})
        }
}


