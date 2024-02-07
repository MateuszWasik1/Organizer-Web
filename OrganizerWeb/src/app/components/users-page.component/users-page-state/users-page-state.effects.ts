import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as UsersActions from "./users-page-state.actions"
import { UserService } from "src/app/services/user.service";

@Injectable()
export class UsersEffects {
    constructor(
        private actions: Actions,
        private userService: UserService) {
    }
    
    loadUsers = createEffect(() => {
        return this.actions.pipe(
            ofType(UsersActions.loadUsers),
            switchMap((params) => {
                return this.userService.GetAllUsers().pipe(
                    map((result) => UsersActions.loadUsersSuccess({ Users: result })),
                    catchError(() => of(UsersActions.loadUsersError()))
                )
            })
        )
    })

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