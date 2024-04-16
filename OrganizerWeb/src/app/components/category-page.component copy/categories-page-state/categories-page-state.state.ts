export const featureKeyCategoriesState = 'categories-page-state';

export interface CategoriesState {
    Categories: any[];
    Category: {
        CGID: string,
        CName: string,
        CStartDate: Date,
        CEndDate: Date,
        CBudget: number,
        CBudgetCount: number,
    },
    Filters: {
        Date: any,
        Skip: number,
        Take: number,
    },
    CategoriesCount: number,
    IsCategoriesError: boolean
    ErrorMessage: string;
}