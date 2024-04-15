export const featureKeyNotesState = 'notes-page-state';

export interface NotesState {
    Notes: any[],
    Note: {
        NGID: string,
        NDate: Date,
        NModificationDate: Date,
        NTitle: string,
        NTxt: string,
    },
    Filters: {
        Skip: number,
        Take: number,
    },
    NotesCount: number,
    ErrorMessage: string,
}