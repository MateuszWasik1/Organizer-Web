import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatsState, featureKeyStatsState } from "./stats-page-state.state";

const selectStatsState = createFeatureSelector<StatsState>(featureKeyStatsState)

export const selectStats = createSelector(selectStatsState, (state: StatsState) => state.Stats)

export const selectFilters = createSelector(selectStatsState, (state: StatsState) => state.Filters)

export const selectCategories = createSelector(selectStatsState, (state: StatsState) => state.Categories)

export const selectErrors = createSelector(selectStatsState, (state: StatsState) => state.IsStatsError)