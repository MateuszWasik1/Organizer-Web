import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as UserActions from "./user-page-state.actions"
import { UserService } from "src/app/services/user.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private userService: UserService,
        private errorHandler: APIErrorHandler) {
    }

    loadUser = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActions.loadUser),
            switchMap((params) => {
                return this.userService.GetUser().pipe(
                    map((result) => UserActions.loadUserSuccess({ User: result })),
                    catchError(error => of(UserActions.loadUserError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    loadUserByAdmin = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActions.loadUserByAdmin),
            switchMap((params) => {
                return this.userService.GetUserByAdmin(params.ugid).pipe(
                    map((result) => UserActions.loadUserByAdminSuccess({ User: result })),
                    catchError(error => of(UserActions.loadUserByAdminError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    saveUser = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActions.saveUser),
            switchMap((params) => {
                return this.userService.SaveUser(params.User).pipe(
                    map(() => UserActions.saveUserSuccess()),
                    catchError(error => of(UserActions.saveUserError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    saveUserByAdmin = createEffect(() => {
        return this.actions.pipe(
            ofType(UserActions.saveUserByAdmin),
            switchMap((params) => {
                return this.userService.SaveUserByAdmin(params.User).pipe(
                    map(() => UserActions.saveUserByAdminSuccess()),
                    catchError(error => of(UserActions.saveUserByAdminError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });
}