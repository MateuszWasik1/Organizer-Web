import { ChartType } from "chart.js";

export const featureKeyStatsState = 'stats-page-state';

export interface StatsState {
    Stats: any[],
    Filters: {
        StartDate: any,
        EndDate: any,
        ChartType: ChartType,
        DataType: string,
    },
    IsStatsError: boolean
}