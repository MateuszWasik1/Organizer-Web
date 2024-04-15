import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import * as UsersActions from "./users-page-state.actions"
import { UserService } from "src/app/services/user.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { selectFilters } from "./users-page-state.selectors";

@Injectable()
export class UsersEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private userService: UserService,
        private errorHandler: APIErrorHandler) {
    }
    
    loadUsers = createEffect(() => {
        return this.actions.pipe(
            ofType(UsersActions.loadUsers),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.userService.GetAllUsers(params[1].Skip, params[1].Take).pipe(
                    map((result) => UsersActions.loadUsersSuccess({ Users: result })),
                    catchError(error => of(UsersActions.loadUsersError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    deleteUser = createEffect(() => {
        return this.actions.pipe(
            ofType(UsersActions.deleteUser),
            switchMap((params) => {
                return this.userService.DeleteUser(params.ugid).pipe(
                    map((result) => UsersActions.deleteUserSuccess({ ugid: params.ugid })),
                    catchError(error => of(UsersActions.deleteUserError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}