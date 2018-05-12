import { random } from 'lodash';
import * as types from '../types';

export const setName = nick => (dispatch, getState) => {
  const { firebase: { auth: { uid }, data } } = getState();
  const { names, nicknames } = data;

  if (names) {
    const ratedNames = nicknames[nick].rating[uid] ? nicknames[nick].rating[uid] : {};

    const allNameKeys = Object.keys(names);
    const ratedNameKeys = ratedNames ? Object.keys(ratedNames) : [];

    if (allNameKeys.length === ratedNameKeys.length) {
      return {
        type: types.ALL_NAMES_RATED
      };
    }

    let name;

    while (name === undefined) {
      const randomNameInt = random(allNameKeys.length);
      const randomNameID = allNameKeys[randomNameInt];
      const randomRatedName = ratedNames[randomNameID];
      const randomAllNamesName = names[randomNameID];

      if (randomRatedName === undefined) {
        name = {
          name: randomAllNamesName,
          id: randomNameID
        };
      }
    }

    dispatch({
      type: types.SET_NAME,
      name
    });
  }
  return null;
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

