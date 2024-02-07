import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as UsersActions from "./users-page-state.actions"

@Injectable()
export class UsersEffects {
    constructor(
        private actions: Actions) {
    }
    
    // loadUsers = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(UsersActions.loadUsers),
    //         switchMap((params) => {
    //             return this.savingsService.getSavings().pipe(
    //                 map((result) => UsersActions.loadUsersSuccess({ Users: result })),
    //                 catchError(() => of(UsersActions.loadUsersError()))
    //             )
    //         })
    //     )
    // })

    // loadUser = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(UsersActions.loadUser),
    //         switchMap((params) => {
    //             return this.savingsService.getSavings().pipe(
    //                 map((result) => UsersActions.loadUserSuccess({ User: result })),
    //                 catchError(() => of(UsersActions.loadUserError()))
    //             )
    //         })
    //     )
    // })
}