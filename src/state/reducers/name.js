import * as types from '../types';

const name = (state = {}, action) => {
  switch (action.type) {
    case types.SET_NAME:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};

export default name;
