import { random } from 'lodash';
import * as types from '../types';

export const setName = (names) => {
  const keys = Object.keys(names);
  const randomNumber = random(keys.length);
  const randomID = keys[randomNumber];

  const name = {
    id: randomID,
    name: names[randomID]
  };

  return {
    type: types.SET_NAME,
    name
  };
};

