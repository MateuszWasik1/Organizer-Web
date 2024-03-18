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
    IsSavingsError: boolean,
    ErrorMessage: string,
}