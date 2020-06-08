import store from './store'

const trackChange = (state, action) => {
    if(!state){
        return {
            isMuted: false,
            volume: 0.5,
            currentTime: '0:00',
            isItPlaying: false,
            duration: '' ,
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

    if(action.type == 'PLAY'){
        return {...state, isPlaying: true}
    }
    if(action.type == 'PAUSE'){
        return {...state, isPlaying: false}
    }
    if(action.type == 'SET_PLAYER_PLAY'){
        return {...state, isItPlaying: action.isItPlaying}
    }

    return state
}
export default trackChange