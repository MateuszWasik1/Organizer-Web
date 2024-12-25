import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import * as BugsActions from "./bugs-page-state.actions"
import { BugsService } from "src/app/services/bugs.service";
import { Router } from "@angular/router";
import { RolesService } from "src/app/services/roles.service";
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { selectFilters, selectFiltersBugNotes } from "./bugs-page-state.selectors";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";

@Injectable()
export class BugsEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private store: Store<AppState>,
        private bugsService: BugsService,
        private rolesService: RolesService,
        private errorHandler: APIErrorHandler) {
    }

    loadBugs = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.loadBugs),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.bugsService.GetBugs(params[1].BugType, params[1].Skip, params[1].Take).pipe(
                    map((result) => BugsActions.loadBugsSuccess({ Bugs: result })),
                    catchError(error => of(BugsActions.loadBugsError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    loadBug = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.loadBug),
            switchMap((params) => {
                return this.bugsService.GetBug(params.bgid).pipe(
                    map((result) => BugsActions.loadBugSuccess({ Bug: result })),
                    catchError(error => of(BugsActions.loadBugError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    loadBugNotes = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.loadBugNotes),
            withLatestFrom(this.store.select(selectFiltersBugNotes)),
            switchMap((params) => {
                return this.bugsService.GetBugNotes(params[0].bgid, params[1].Skip, params[1].Take).pipe(
                    map((result) => BugsActions.loadBugNotesSuccess({ BugNotes: result })),
                    catchError(error => of(BugsActions.loadBugNotesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    loadUserRoles = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.loadUserRoles),
            switchMap(() => {
                return this.rolesService.GetUserRoles().pipe(
                    map((result) => BugsActions.loadUserRolesSuccess({ UserRoles: result })),
                    catchError(error => of(BugsActions.loadUserRolesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    saveBug = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.saveBug),
            switchMap((params) => {
                return this.bugsService.SaveBug(params.bug).pipe(
                    map(() => BugsActions.saveBugSuccess({ bug: params.bug })),
                    tap(x => this.router.navigate(['bugs'])),
                    catchError(error => of(BugsActions.saveBugError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    saveBugNote = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.saveBugNote),
            switchMap((params) => {
                return this.bugsService.SaveBugNote(params.BugNote).pipe(
                    map(() => BugsActions.saveBugNoteSuccess({ BugNote: params.BugNote })),
                    catchError(error => of(BugsActions.saveBugNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    changeBugStatus = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.changeBugStatus),
            switchMap((params) => {
                return this.bugsService.ChangeBugStatus(params.model).pipe(
                    map(() => BugsActions.changeBugStatusSuccess({ status: params.model.Status })),
                    catchError(error => of(BugsActions.changeBugStatusError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}