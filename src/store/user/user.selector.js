import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);

export const selectDisplayName = createSelector(
  [selectUserReducer],
  (user) => user.displayName
);
