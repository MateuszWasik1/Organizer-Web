import { createReducer, on } from "@ngrx/store";
import * as Actions from "./notes-page-state.actions"
import { NotesState } from "./notes-page-state.state";

var initialStateOfNotesPage: NotesState = {
    Notes: [],
    Note: {
        NGID: "",
        NDate: new Date(),
        NModificationDate: new Date(),
        NTitle: "",
        NTxt: "",
    },
    Filters: {
        Skip: 0,
        Take: 10,
    },
    NotesCount: 0,
    ErrorMessage: "",
};

export const NotesReducer = createReducer<NotesState>(
    initialStateOfNotesPage,

    on(Actions.loadNoteSuccess, (state, { Note }) => ({
        ...state,
        Note: {
            NGID: Note.ngid,
            NDate: Note.nDate,
            NModificationDate: Note.nModificationDate,
            NTitle: Note.nTitle,
            NTxt: Note.nTxt,
        },
    })),

    on(Actions.loadNoteError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.loadNotesSuccess, (state, { Notes }) => ({
        ...state,
        Notes: Notes.list,
        NotesCount: Notes.count,
    })),

    on(Actions.loadNotesError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.addNoteSuccess, (state) => ({
        ...state,
    })),

    on(Actions.addNoteError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.updateNoteSuccess, (state) => ({
        ...state,
    })),

    on(Actions.updateNoteError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.deleteNoteSuccess, (state, { NGID }) => {
        let newNotes = [...state.Notes];
        let existingNoteIndex = newNotes.findIndex(x => x.ngid == NGID);

        if(existingNoteIndex != -1)
        newNotes.splice(existingNoteIndex, 1)

        return {...state, Notes: newNotes};
    }),

    on(Actions.deleteNoteError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.updatePaginationData, (state, { PaginationData }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Skip: PaginationData.Skip,
            Take:  PaginationData.Take,
        }
    })),

    on(Actions.cleanState, (state) => ({
        Notes: [],
        Note: {
            NGID: "",
            NDate: new Date(),
            NModificationDate: new Date(),
            NTitle: "",
            NTxt: "",
        },
        Filters: {
            Skip: 0,
            Take: 10,
        },
        NotesCount: 0,
        ErrorMessage: "",
    })),
)