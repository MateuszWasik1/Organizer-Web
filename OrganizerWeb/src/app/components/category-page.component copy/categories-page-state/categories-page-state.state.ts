export const featureKeyCategoriesState = 'categories-page-state';

export interface CategoriesState {
    Categories: any[];
    Filters: {
        Date: any,
    },
    IsCategoriesError: boolean
    ErrorMessage: string;
}