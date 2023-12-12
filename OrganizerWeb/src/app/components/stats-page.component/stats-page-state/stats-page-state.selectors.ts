import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatsState, featureKeyStatsState } from "./stats-page-state.state";

const selectStatsState = createFeatureSelector<StatsState>(featureKeyStatsState)

export const selectFilters= createSelector(selectStatsState, (state: StatsState) => state.Filters)

export const selectErrors= createSelector(selectStatsState, (state: StatsState) => state.IsStatsError)