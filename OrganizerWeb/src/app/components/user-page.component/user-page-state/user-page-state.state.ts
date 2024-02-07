export const featureKeyUserState = 'user-page-state';

export interface UserState {
    User: {
        UID: number,
        UGID: string,
        URID: number,
        uFirstName: string,
        uLastName: string,
        uUserName: string,
        uEmail: string,
        uPhone: string,
        UCategoriesCount: number,
        UTasksCount: number,
        UTaskNotesCount: number,
        USavingsCount: number,
    }
}