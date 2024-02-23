import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as BugsActions from "./bugs-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { BugsService } from "src/app/services/bugs.service";
import { Router } from "@angular/router";

@Injectable()
export class BugsEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private bugsService: BugsService) {
    }

    loadBugs = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.loadBugs),
            switchMap((params) => {
                return this.bugsService.GetBugs().pipe(
                    map((result) => BugsActions.loadBugsSuccess({ Bugs: result })),
                    catchError(() => of(BugsActions.loadBugsError()))
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
                    catchError(() => of(BugsActions.loadBugError()))
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
                    catchError(() => of(BugsActions.saveBugError()))
                )
            })
        )
    })

    
    changeBugStatus = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.changeBugStatus),
            switchMap((params) => {
                return this.bugsService.ChangeBugStatus(params.model).pipe(
                    map(() => BugsActions.changeBugStatusSuccess({ status: params.model.status })),
                    catchError(() => of(BugsActions.changeBugStatusError()))
                )
            })
        )
    })
}