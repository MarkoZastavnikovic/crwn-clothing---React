import { createAction } from "../../utils/reducer/reducer.utils";

import { USER_ACTION_TYPES } from "./user.types";

export const createActionSetCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const createActionSetDisplayName = (displayName) =>
  createAction(USER_ACTION_TYPES.SET_DISPLAY_NAME, displayName);
