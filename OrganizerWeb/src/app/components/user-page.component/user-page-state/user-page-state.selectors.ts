import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, featureKeyUserState } from "./user-page-state.state";


const selectUserState = createFeatureSelector<UserState>(featureKeyUserState)

export const selectUser = createSelector(selectUserState, (state: UserState) => state.User)

export const selectErrorMessage = createSelector(selectUserState, (state: UserState) => state.ErrorMessage)