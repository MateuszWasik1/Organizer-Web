import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BugsState, featureKeyBugsState } from "./bugs-page-state.state";

const selectBugsState = createFeatureSelector<BugsState>(featureKeyBugsState)

export const selectBugs = createSelector(selectBugsState, (state: BugsState) => state.Bugs);

export const selectBug = createSelector(selectBugsState, (state: BugsState) => state.Bug);

export const selectBugNotes = createSelector(selectBugsState, (state: BugsState) => state.BugNotes);

export const selectUserRoles = createSelector(selectBugsState, (state: BugsState) => state.UserRoles);

export const selectFilters = createSelector(selectBugsState, (state: BugsState) => state.Filters);

export const selectFiltersBugNotes = createSelector(selectBugsState, (state: BugsState) => state.FiltersBugNotes);

export const selectBugsCount= createSelector(selectBugsState, (state: BugsState) => state.BugsCount);

export const selectBugsNotesCount= createSelector(selectBugsState, (state: BugsState) => state.BugsNotesCount);

export const selectErrorMessage = createSelector(selectBugsState, (state: BugsState) => state.ErrorMessage);