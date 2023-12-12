import { createReducer, on } from "@ngrx/store";
import * as Actions from "./stats-page-state.actions"
import { StatsState } from "./stats-page-state.state";

var initialStateOfStatsPage: StatsState = {
    Filters: {
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
    IsStatsError: false,
};

export const StatsReducer = createReducer<StatsState>(
    initialStateOfStatsPage,
  
    on(Actions.changeDateFilter, (state, { date }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Date: date,
        }
    })),
) 
