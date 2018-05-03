import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import name from './name';

const todoApp = combineReducers({
  name,
  firebase: firebaseReducer
});

export default todoApp;

