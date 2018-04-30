import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';

import profile from './profile/profile';


const todoApp = combineReducers({
  profile,
  firebase: firebaseReducer,
  routing: routerReducer
});

export default todoApp;

