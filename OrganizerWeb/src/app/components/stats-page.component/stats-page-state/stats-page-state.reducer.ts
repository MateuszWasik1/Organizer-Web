import { createReducer, on } from "@ngrx/store";
import * as Actions from "./stats-page-state.actions"
import { StatsState } from "./stats-page-state.state";
import { Guid } from "guid-typescript";

var initialStateOfStatsPage: StatsState = {
    Stats: {
        labels: [],
        datasets: [],
    },
    Filters: {
        StartDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        EndDate:  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        ChartType: 'bar',
        DataType: 'savings',
        Category: Guid.EMPTY,
    },
    Categories: [],
    IsStatsError: false,
};

export const StatsReducer = createReducer<StatsState>(
    initialStateOfStatsPage,
    //Stats
    on(Actions.loadStatsSuccess, (state, { Result }) => ({
        ...state,
        Stats: {
            labels: Result.labels,
            datasets: [Result.datasets]
        }
    })),

    on(Actions.loadStatsError, (state) => ({
        ...state,
        IsStatsError: true,
    })),

    //Categories
    on(Actions.loadCategoriesSuccess, (state, { Categories }) => ({
        ...state,
        Categories: Categories
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

    on(Actions.changeDataTypeFilter, (state, { dataType }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            DataType: dataType,
        }
    })),

    on(Actions.changeCategoryFilter, (state, { category }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Category: category,
        }
    })),
) 