import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as AccountActions from "./account-page-state.actions"
import { AccountsService } from "src/app/services/accounts.service";


@Injectable()
export class AccountEffects {
    constructor(
        private actions: Actions,
        private accountService: AccountsService) {
    }
    
    RegisterUser = createEffect(() => {
        return this.actions.pipe(
            ofType(AccountActions.RegisterUser),
            switchMap((params) => {
                return this.accountService.Register(params.user).pipe(
                    map(() => AccountActions.RegisterUserSuccess()),
                    catchError(() => of(AccountActions.RegisterUserError()))
                )
            })
        )
    })
}