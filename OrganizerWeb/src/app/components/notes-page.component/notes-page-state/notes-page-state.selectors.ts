import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotesState, featureKeyNotesState } from "./notes-page-state.state";

const selectNotesState = createFeatureSelector<NotesState>(featureKeyNotesState)

export const selectNote = createSelector(selectNotesState, (state: NotesState) => state.Note);

export const selectNotes = createSelector(selectNotesState, (state: NotesState) => state.Notes);

export const selectFilters= createSelector(selectNotesState, (state: NotesState) => state.Filters);

export const selectCount= createSelector(selectNotesState, (state: NotesState) => state.NotesCount);

export const selectErrorMessage = createSelector(selectNotesState, (state: NotesState) => state.ErrorMessage);