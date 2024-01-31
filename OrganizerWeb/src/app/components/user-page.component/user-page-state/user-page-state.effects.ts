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

    loadCategories = createEffect(() => {
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

    saveCategory = createEffect(() => {
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
}