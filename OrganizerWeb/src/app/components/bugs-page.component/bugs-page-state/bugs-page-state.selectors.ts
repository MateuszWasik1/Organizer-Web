import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BugsState, featureKeyBugsState } from "./bugs-page-state.state";

const selectBugsState = createFeatureSelector<BugsState>(featureKeyBugsState)

export const selectBugs = createSelector(selectBugsState, (state: BugsState) => state.Bugs)

export const selectBug = createSelector(selectBugsState, (state: BugsState) => state.Bug)

export const selectBugNotes = createSelector(selectBugsState, (state: BugsState) => state.BugNotes)

export const selectUserRoles = createSelector(selectBugsState, (state: BugsState) => state.UserRoles)