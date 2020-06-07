import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import login from './loginReducer'
import track from './track'

const store  = createStore(combineReducers({login: login, trackChange:track}), applyMiddleware(thunk))

export default store