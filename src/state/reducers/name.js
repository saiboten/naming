import * as types from '../types';

const name = (state = {}, action) => {
  switch (action.type) {
    case types.SET_NAME:
      return {
        ...state,
        name: action.name
      };
    case types.ALL_NAMES_RATED:
      return {
        ...state,
        allRated: true
      };
    case types.FIND_JOIN_USER_SUCCESS:
      return {
        ...state,
        joinSuccess: true,
        joinFailed: false
      };
    case types.FIND_JOIN_USER_FAILED:
      return {
        ...state,
        joinSuccess: false,
        joinFailed: true
      };
    case types.FIND_JOIN_USER_CLEAR:
      return {
        ...state,
        joinSuccess: false,
        joinFailed: false
      };
    default:
      return state;
  }
};

export default name;
