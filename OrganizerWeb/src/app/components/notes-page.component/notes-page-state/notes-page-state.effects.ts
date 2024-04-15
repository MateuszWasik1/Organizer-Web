import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import * as NotesActions from "./notes-page-state.actions"
import { Router } from "@angular/router";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";
import { NotesService } from "src/app/services/notes.service";
import { selectFilters } from "./notes-page-state.selectors";

@Injectable()
export class NotesEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private notesService: NotesService,
        private errorHandler: APIErrorHandler) {
    }

    loadNote = createEffect(() => {
        return this.actions.pipe(
            ofType(NotesActions.loadNote),
            switchMap((params) => {
                return this.notesService.GetNote(params.NGID).pipe(
                    map((result) => NotesActions.loadNoteSuccess({ Note: result })),
                    catchError(error => of(NotesActions.loadNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    loadNotes = createEffect(() => {
        return this.actions.pipe(
            ofType(NotesActions.loadNotes),
            withLatestFrom(selectFilters),
            switchMap((params) => {
                return this.notesService.GetNotes(params.Skip, params.Take).pipe(
                    map((result) => NotesActions.loadNotesSuccess({ Notes: result })),
                    catchError(error => of(NotesActions.loadNotesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    addNote = createEffect(() => {
        return this.actions.pipe(
            ofType(NotesActions.addNote),
            switchMap((params) => {
                return this.notesService.AddNote(params.Note).pipe(
                    map(() => NotesActions.addNoteSuccess()),
                    tap(x => this.router.navigate(['notes'])),
                    catchError(error => of(NotesActions.addNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    updateNote = createEffect(() => {
        return this.actions.pipe(
            ofType(NotesActions.updateNote),
            switchMap((params) => {
                return this.notesService.UpdateNote(params.Note).pipe(
                    map(() => NotesActions.updateNoteSuccess({ Note: params.Note })),
                    tap(x => this.router.navigate(['notes'])),
                    catchError(error => of(NotesActions.updateNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    deleteNote = createEffect(() => {
        return this.actions.pipe(
            ofType(NotesActions.deleteNote),
            switchMap((params) => {
                return this.notesService.DeleteNote(params.NGID).pipe(
                    map(() => NotesActions.deleteNoteSuccess({ NGID: params.NGID })),
                    catchError(error => of(NotesActions.deleteNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}