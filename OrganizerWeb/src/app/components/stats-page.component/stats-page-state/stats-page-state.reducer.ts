import { createReducer, on } from "@ngrx/store";
import * as Actions from "./stats-page-state.actions"
import { StatsState } from "./stats-page-state.state";

var initialStateOfStatsPage: StatsState = {
    Stats: {
        labels: [],
        datasets: [],
    },
    Filters: {
        StartDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        EndDate:  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        ChartType: 'bar',
        DataType: '',
    },
    IsStatsError: false,
};

export const StatsReducer = createReducer<StatsState>(
    initialStateOfStatsPage,

    on(Actions.loadStatsSuccess, (state, { Result }) => ({
        ...state,
        Stats: {
            labels: Result.labels,
            datasets: [Result.datasets]
        }
    })),
  
    //Filters
    on(Actions.changeStartDateFilter, (state, { startDate }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            StartDate: startDate,
        }
    })),

    on(Actions.changeEndDateFilter, (state, { endDate }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            EndDate: endDate,
        }
    })),
) 
