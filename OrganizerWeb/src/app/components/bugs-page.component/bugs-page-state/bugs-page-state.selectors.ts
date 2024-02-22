import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BugsState, featureKeyBugsState } from "./bugs-page-state.state";

const selectBugsState = createFeatureSelector<BugsState>(featureKeyBugsState)

export const selectBugs = createSelector(selectBugsState, (state: BugsState) => state.Bugs)

export const selectBug = createSelector(selectBugsState, (state: BugsState) => state.Bug)

// export const selectFilters= createSelector(selectCategoriesState, (state: CategoriesState) => state.Filters)

// export const selectErrors= createSelector(selectCategoriesState, (state: CategoriesState) => state.IsCategoriesError)