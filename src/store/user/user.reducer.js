import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  displayName: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    case USER_ACTION_TYPES.SET_DISPLAY_NAME:
      return {
        ...state,
        displayName: payload,
      };

    // case 'increment':
    //   return {
    //     value: state.value + 1,
    //   }
    default:
      return state;
  }
};
