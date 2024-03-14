import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import * as NotesActions from "./notes-page-state.actions"
import { Router } from "@angular/router";
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";

@Injectable()
export class BugsEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private store: Store<AppState>,
        private errorHandler: APIErrorHandler) {
    }

    // loadBugs = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(BugsActions.loadBugs),
    //         switchMap((params) => {
    //             return this.bugsService.GetBugs(params[1].BugType).pipe(
    //                 map((result) => BugsActions.loadBugsSuccess({ Bugs: result })),
    //                 catchError(error => of(BugsActions.loadBugsError({ error: this.errorHandler.handleAPIError(error) })))
    //             )
    //         })
    //     )
    // })

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