import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap} from "rxjs/operators";
import * as CategoriesActions from "./tasks-page-state.actions"
import { CategoriesService } from "src/app/services/categories.service";

@Injectable()
export class TasksEffects {
    constructor(
        private actions: Actions,
        private categoriesService: CategoriesService) {
    }
    loadTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasks),
            switchMap((params) => {
                return this.categoriesService.getCategories().pipe(
                    map((result) => CategoriesActions.loadTasksSuccess({ Tasks: result })),
                    catchError((error) => of(CategoriesActions.loadTasksError()))
                )
            })
        )
    })

    saveTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.saveTask),
            switchMap((params) => {
                return this.categoriesService.saveCategories(params.Task).pipe(
                    map((result) => CategoriesActions.saveTaskSuccess({ Task: params.Task })),
                    catchError((error) => of(CategoriesActions.saveTaskError()))
                )
            })
        )
    })
}