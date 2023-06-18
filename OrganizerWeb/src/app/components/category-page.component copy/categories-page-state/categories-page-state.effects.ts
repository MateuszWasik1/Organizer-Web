import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap} from "rxjs/operators";
import * as CategoriesActions from "./categories-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { CategoriesService } from "src/app/services/categories.service";

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private categoriesService: CategoriesService) {
    }
    loadCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCategories),
            switchMap((params) => {
                return this.categoriesService.getCategories().pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result })),
                    catchError((error) => of(CategoriesActions.loadCategoriesError()))
                )
            })
        )
    })
}