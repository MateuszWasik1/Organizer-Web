import { BubbleDataPoint, ChartData, ChartType, ChartTypeRegistry, Point } from "chart.js";

export const featureKeyStatsState = 'stats-page-state';

export interface StatsState {
    Stats: ChartData<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>,
    Filters: {
        StartDate: any,
        EndDate: any,
        ChartType: ChartType,
        DataType: string,
        Category: string,
    },
    Categories: [],
    IsStatsError: boolean
}