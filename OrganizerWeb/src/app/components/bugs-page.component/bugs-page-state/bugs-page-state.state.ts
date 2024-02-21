export const featureKeyBugsState = 'bugs-page-state';

export interface BugsState {
    Bugs: any[];
    Filters: {
        Date: any,
    },
}