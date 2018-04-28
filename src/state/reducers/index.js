import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import profile from './profile/profile';


const todoApp = combineReducers({
  profile,
  firebase: firebaseReducer
});

export default todoApp;

