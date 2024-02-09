import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState, featureKeyUsersState } from "./users-page-state.state";

const selectSavingsState = createFeatureSelector<UsersState>(featureKeyUsersState)

export const selectUsers = createSelector(selectSavingsState, (state: UsersState) => state.Users)