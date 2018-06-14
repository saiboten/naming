// import { random } from 'lodash';
import * as types from '../types';

export const setName = () => (dispatch, getState) => {
  const { firebase: { data } } = getState();
  const { names } = data;

  if (names) {
    const keys = Object.keys(names);
    const key = keys[Math.floor(Math.random() * keys.length)];

    const name = {
      name: names[key],
      id: key
    };

    dispatch({
      type: types.SET_NAME,
      name
    });
  }
};

export const joinFailedAction = () => ({
  type: types.FIND_JOIN_USER_FAILED
});

export const joinSuccessAction = () => ({
  type: types.FIND_JOIN_USER_SUCCESS
});

export const clearJoinStatusAction = () => ({
  type: types.FIND_JOIN_USER_CLEAR
});

