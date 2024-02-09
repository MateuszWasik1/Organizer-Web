import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as UserActions from "./user-page-state.actions"
import { UserService } from "src/app/services/user.service";

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private userService: UserService) {
    }

    loadUser = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActions.loadUser),
            switchMap((params) => {
                return this.userService.GetUser().pipe(
                    map((result) => UserActions.loadUserSuccess({ User: result })),
                    catchError(() => of(UserActions.loadUserError()))
                )
            })
        )
    })

    loadUserByAdmin = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActions.loadUserByAdmin),
            switchMap((params) => {
                return this.userService.GetUserByAdmin(params.ugid).pipe(
                    map((result) => UserActions.loadUserByAdminSuccess({ User: result })),
                    catchError(() => of(UserActions.loadUserByAdminError()))
                )
            })
        )
    })

    saveUser = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActions.saveUser),
            switchMap((params) => {
                return this.userService.SaveUser(params.User).pipe(
                    map(() => UserActions.saveUserSuccess()),
                    catchError(() => of(UserActions.saveUserError()))
                )
            })
        )
    })

    saveUserByAdmin = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActions.saveUserByAdmin),
            switchMap((params) => {
                return this.userService.SaveUserByAdmin(params.User).pipe(
                    map(() => UserActions.saveUserByAdminSuccess()),
                    catchError(() => of(UserActions.saveUserByAdminError()))
                )
            })
        )
    })
}