export const featureKeySavingsState = 'savings-page-state';

export interface SavingsState {
    Savings: any[],
    Saving: {
        SGID: string,
        SAmount: number,
        STime: Date,
        SOnWhat: string,
        SWhere: string,
    },
    Filters: {
        Skip: number,
        Take: number,
    },
    SavingsCount: number,
    IsSavingsError: boolean,
    ErrorMessage: string,
}