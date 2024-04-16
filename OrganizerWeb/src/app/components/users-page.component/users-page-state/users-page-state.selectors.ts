import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState, featureKeyUsersState } from "./users-page-state.state";

const selectSavingsState = createFeatureSelector<UsersState>(featureKeyUsersState)

export const selectUsers = createSelector(selectSavingsState, (state: UsersState) => state.Users);

export const selectFilters= createSelector(selectSavingsState, (state: UsersState) => state.Filters);

export const selectCount= createSelector(selectSavingsState, (state: UsersState) => state.UsersCount);

export const selectErrorMessage = createSelector(selectSavingsState, (state: UsersState) => state.ErrorMessage);