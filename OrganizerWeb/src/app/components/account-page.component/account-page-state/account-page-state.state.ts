export const featureKeyAccountState = 'account-page-state';

export interface AccountState {
    RegisterData: {
        UUserName: string,
        UEmail: string,
        UPassword: string,
    },
    Token: string;
}
