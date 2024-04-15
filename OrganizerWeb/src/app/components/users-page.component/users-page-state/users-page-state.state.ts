export const featureKeyUsersState = 'users-page-state';

export interface UsersState {
    Users: any[];
    Filters: {
        Skip: number,
        Take: number,
    },
    UsersCount: number,
    ErrorMessage: string;
}