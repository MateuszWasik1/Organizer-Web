import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import * as NotesActions from "./notes-page-state.actions"
import { Router } from "@angular/router";
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";
import { NotesService } from "src/app/services/notes.service";

@Injectable()
export class NotesEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private store: Store<AppState>,
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
            switchMap((params) => {
                return this.notesService.GetNotes().pipe(
                    map((result) => NotesActions.loadNotesSuccess({ Notes: result })),
                    catchError(error => of(NotesActions.loadNotesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    // loadBug = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(BugsActions.loadBug),
    //         switchMap((params) => {
    //             return this.bugsService.GetBug(params.bgid).pipe(
    //                 map((result) => BugsActions.loadBugSuccess({ Bug: result })),
    //                 catchError(error => of(BugsActions.loadBugError({ error: this.errorHandler.handleAPIError(error) })))
    //             )
    //         })
    //     )
    // })

    // saveBug = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(BugsActions.saveBug),
    //         switchMap((params) => {
    //             return this.bugsService.SaveBug(params.bug).pipe(
    //                 map(() => BugsActions.saveBugSuccess({ bug: params.bug })),
    //                 tap(x => this.router.navigate(['bugs'])),
    //                 catchError(error => of(BugsActions.saveBugError({ error: this.errorHandler.handleAPIError(error) })))
    //             )
    //         })
    //     )
    // })

    // changeBugStatus = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(BugsActions.changeBugStatus),
    //         switchMap((params) => {
    //             return this.bugsService.ChangeBugStatus(params.model).pipe(
    //                 map(() => BugsActions.changeBugStatusSuccess({ status: params.model.Status })),
    //                 catchError(error => of(BugsActions.changeBugStatusError({ error: this.errorHandler.handleAPIError(error) })))
    //             )
    //         })
    //     )
    // })
}