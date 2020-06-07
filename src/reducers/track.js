import store from './store'

const trackChange = (state, action) => {
    if(!state){
        return {
            isMuted: false,
            volume: 0.5,
            currentTime: '0:00',
            isItPlaying: false,
            duration: '' ,
            noshuffle: null,
            repeat: false,
            shuffle: false,
            isPlaying: false,
            playingTrack: {id: null, index: null},
            playlist: null
           
        }
    }
    if(action.type == 'SET_PLAYLIST'){
        const {playlist} = action
        return {...state,playlist}
    }
    
    if(action.type == 'PLAY_TRACK'){
        const { index, id} = action
    
        state.playingTrack.index = index
        state.playingTrack.id = id
        return state
    }
    if(action.type == 'CURRENT_TIME'){
        const {currentTime} = action
        return {...state, currentTime}
    }
    if(action.type == 'LOAD_METADATA'){
        const {duration} = action
        return {...state, duration}
    }
    if(action.type == 'VOLUME_CHANGE'){
        const {muted, volume} = action
        return {...state, muted, volume}
    }
    if(action.type == 'SHUFFLE'){
        return {...state, shuffle: !state.shuffle}
    }
    if(action.type == 'REPEAT'){
        return {...state, repeat: !state.repeat}
    }
    if(action.type == 'PLAY'){
        return {...state, isPlaying: true}
    }
    if(action.type == 'PAUSE'){
        return {...state, isPlaying: false}
    }
    if(action.type == 'SET_PLAYER_PLAY'){
        return {...state, isItPlaying: action.isItPlaying}
    }
    if(action.type == 'SET_NOSHUFFLE_PLAYLIST'){
        const {noshuffle} = action
        return {...state, noshuffle: noshuffle}
    }
    return state
}
export default trackChange