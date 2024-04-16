import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import * as CategoriesActions from "./tasks-page-state.actions"
import { TasksService } from "src/app/services/tasks.service";
import { CategoriesService } from "src/app/services/categories.service";
import { selectFilters, selectFiltersTasksNotes, selectFiltersTasksSubTasks } from "./tasks-page-state.selectors";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { FillDataService } from "src/app/services/fill-data.service";
import { TasksNotesService } from "src/app/services/tasks-notes.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";
import { Router } from "@angular/router";
import { TasksSubTasksService } from "src/app/services/tasks-subtasks.service";

@Injectable()
export class TasksEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private tasksService: TasksService,
        private tasksNotesService: TasksNotesService,
        private tasksSubTasksService: TasksSubTasksService,
        private categoriesService: CategoriesService,
        public store: Store<AppState>,
        private fillDataService: FillDataService,
        private errorHandler: APIErrorHandler) {
    }

    loadTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTask),
            switchMap((params) => {
                return this.tasksService.GetTask(params.TGID).pipe(
                    map((result) => CategoriesActions.loadTaskSuccess({ Task: result })),
                    catchError(error => of(CategoriesActions.loadTaskError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    loadTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasks),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.tasksService.GetTasks(params[1].Category, params[1].Status, params[1].Skip, params[1].Take).pipe(
                    map((result) => CategoriesActions.loadTasksSuccess({ Tasks: result })),
                    catchError(error => of(CategoriesActions.loadTasksError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    });

    loadTasksNotes = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasksNotes),
            withLatestFrom(this.store.select(selectFiltersTasksNotes)),
            switchMap((params) => {
                return this.tasksNotesService.GetTasksNotes(params[0].TGID, params[1].Skip, params[1].Take).pipe(
                    map((result) => CategoriesActions.loadTasksNotesSuccess({ TasksNotes: result })),
                    catchError(error => of(CategoriesActions.loadTasksNotesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    loadTasksSubTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasksSubTasks),
            withLatestFrom(this.store.select(selectFiltersTasksSubTasks)),
            switchMap((params) => {
                return this.tasksSubTasksService.GetTasksSubTask(params[0].TGID, params[1].Skip, params[1].Take).pipe(
                    map((result) => CategoriesActions.loadTasksSubTasksSuccess({ TasksSubTasks: result })),
                    catchError(error => of(CategoriesActions.loadTasksSubTasksError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    loadCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCategories),
            switchMap(() => {
                return this.categoriesService.GetCategories(null, 0, 99999, true).pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result.list })),
                    catchError(error => of(CategoriesActions.loadCategoriesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    loadCustomTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCustomTasks),
            switchMap(() => {
                return of(this.fillDataService.FillTasks()).pipe(
                    map((result) => CategoriesActions.loadTasksSuccess({ Tasks: result })),
                    catchError(error => of(CategoriesActions.loadTasksError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    loadCustomCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCustomCategories),
            switchMap(() => {
                return of(this.fillDataService.FillCategories()).pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result })),
                    catchError(error => of(CategoriesActions.loadCategoriesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    addTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.addTask),
            switchMap((params) => {
                return this.tasksService.AddTask(params.Task).pipe(
                    map(() => CategoriesActions.addTaskSuccess()),
                    tap(() => this.router.navigate(["/tasks"])),
                    catchError(error => of(CategoriesActions.addTaskError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    updateTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.updateTask),
            switchMap((params) => {
                return this.tasksService.UpdateTask(params.Task).pipe(
                    map(() => CategoriesActions.updateTaskSuccess()),
                    tap(() => this.router.navigate(["/tasks"])),
                    catchError(error => of(CategoriesActions.updateTaskError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    saveTaskNote = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.saveTaskNote),
            switchMap((params) => {
                return this.tasksNotesService.AddTaskNotes(params.TNGID, params.TGID, params.TaskNote).pipe(
                    map(() => CategoriesActions.saveTaskNoteSuccess({ TaskNote: params })),
                    catchError(error => of(CategoriesActions.saveTaskNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    addTaskSubTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.addTaskSubTask),
            switchMap((params) => {
                return this.tasksSubTasksService.AddTaskSubTask(params.SubTask).pipe(
                    map(() => CategoriesActions.addTaskSubTaskSuccess({ SubTask: params.SubTask })),
                    catchError(error => of(CategoriesActions.addTaskSubTaskError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    taskSubTaskChangeStatus = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.taskSubTaskChangeStatus),
            switchMap((params) => {
                return this.tasksSubTasksService.ChangeTaskSubTaskStatus(params.Model).pipe(
                    map(() => CategoriesActions.taskSubTaskChangeStatusSuccess({ Model: params.Model })),
                    catchError(error => of(CategoriesActions.taskSubTaskChangeStatusError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    deleteTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteTask),
            switchMap((params) => {
                return this.tasksService.DeleteTask(params.tgid).pipe(
                    map(() => CategoriesActions.deleteTaskSuccess({ tgid: params.tgid })),
                    catchError(error => of(CategoriesActions.deleteTaskError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    deleteTaskNote = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteTaskNote),
            switchMap((params) => {
                return this.tasksNotesService.DeleteTaskNote(params.TNGID).pipe(
                    map(() => CategoriesActions.deleteTaskNoteSuccess({ TNGID: params.TNGID })),
                    catchError(error => of(CategoriesActions.deleteTaskNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    deleteSubTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteTaskSubTask),
            switchMap((params) => {
                return this.tasksSubTasksService.DeleteTaskSubTask(params.TSTGID).pipe(
                    map(() => CategoriesActions.deleteTaskSubTaskSuccess({ TSTGID: params.TSTGID })),
                    catchError(error => of(CategoriesActions.deleteTaskSubTaskError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });

    deleteTaskRelatedEntities = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteTaskRelatedEntities),
            switchMap((params) => {
                return this.tasksService.DeleteTaskRelatedEntities(params.Model).pipe(
                    map(() => CategoriesActions.deleteTaskRelatedEntitiesSuccess({ TGID: params.Model.TGID })),
                    catchError(error => of(CategoriesActions.deleteTaskRelatedEntitiesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    });
}