import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as UsersActions from "./users-page-state.actions"
import { UserService } from "src/app/services/user.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";

@Injectable()
export class UsersEffects {
    constructor(
        private actions: Actions,
        private userService: UserService,
        private errorHandler: APIErrorHandler) {
    }
    
    loadUsers = createEffect(() => {
        return this.actions.pipe(
            ofType(UsersActions.loadUsers),
            switchMap((params) => {
                return this.userService.GetAllUsers().pipe(
                    map((result) => UsersActions.loadUsersSuccess({ Users: result })),
                    catchError(error => of(UsersActions.loadUsersError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}