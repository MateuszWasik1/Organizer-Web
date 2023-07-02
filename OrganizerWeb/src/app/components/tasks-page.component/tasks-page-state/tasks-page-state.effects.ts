import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap} from "rxjs/operators";
import * as CategoriesActions from "./tasks-page-state.actions"
import { TasksService } from "src/app/services/tasks.service";

@Injectable()
export class TasksEffects {
    constructor(
        private actions: Actions,
        private categoriesService: TasksService) {
    }
    loadTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasks),
            switchMap((params) => {
                return this.categoriesService.getTasks().pipe(
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
                return this.categoriesService.saveTask(params.Task).pipe(
                    map((result) => CategoriesActions.saveTaskSuccess({ Task: params.Task })),
                    catchError((error) => of(CategoriesActions.saveTaskError()))
                )
            })
        )
    })
}