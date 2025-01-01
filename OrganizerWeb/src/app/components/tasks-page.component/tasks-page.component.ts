import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ChangeCategoryFilterValue, ChangeStatusFilterValue, deleteTask, loadCategories, loadCustomCategories, loadCustomTasks, loadTasks, cleanState, deleteTaskRelatedEntities, updatePaginationDataTasks } from './tasks-page-state/tasks-page-state.actions';
import { selectCategories, selectCount, selectErrorMessage, selectErrors, selectFilters, selectTasks } from './tasks-page-state/tasks-page-state.selectors';
import { MatDialog } from '@angular/material/dialog';
import { TasksFillDataDialogComponent } from './tasks-dialogs/tasks-fill-data-dialog.component';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Router } from '@angular/router';
import { TasksDeleteDialogComponent } from './tasks-dialogs/tasks-delete-dialog.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public statuses: any;
  public deleteTGID: any;
  public count: number = 0;

  public selectedFilterStatus: any;
  public selectedFilterCategory: any;

  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public Tasks$ = this.store.select(selectTasks);
  public Categories$ = this.store.select(selectCategories);
  public Errors$ = this.store.select(selectErrors);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    private dialog: MatDialog, 
    public router: Router,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  
  ngOnInit(): void {
    this.store.dispatch(loadCategories());

    this.statuses = [
      {id: '0', name: 'Nie zaczęty'},
      {id: '1', name: 'W trakcie'},
      {id: '2', name: 'Skończony'},
      {id: '3', name: 'Wszystkie'},
    ];

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadTasks())));

    this.subscriptions.push(
      this.Errors$.subscribe(isErrors => {
        if(isErrors.IsTasksError || isErrors.IsCategoriesError)
        {
          this.dialog
            .open(TasksFillDataDialogComponent, {
              data: {
                IsTasksError: isErrors.IsTasksError,
                IsCategoriesError: isErrors.IsCategoriesError,
              }
            })
            .afterClosed()
            .subscribe(fill => {
              if(fill && isErrors.IsTasksError)
                this.store.dispatch(loadCustomTasks());
              if(fill && isErrors.IsCategoriesError)
                this.store.dispatch(loadCustomCategories());
              }
            );          
        }
      })
    )

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        let notesError = error.includes("Do zadania przypisane są notatki! Usuń je najpierw!") ;
        let subTasksError = error.includes("Do zadania przypisane są podzadania! Usuń je najpierw!");

        if(notesError || subTasksError)
        {
          this.dialog
            .open(TasksDeleteDialogComponent, {
              data: {
                error: error,
              }
            })
            .afterClosed()
            .subscribe(response => {
              let model = {
                TGID: this.deleteTGID,
                DeleteTaskSubTasks: false,
                DeleteTaskNotes: false,
              };

              if(response == 1 || response == 3)
                model.DeleteTaskNotes = true

              if(response >= 2)
                model.DeleteTaskSubTasks = true

              if(response > 0)
                this.store.dispatch(deleteTaskRelatedEntities({ Model: model }));
            });    
        }
        else       
          this.errorHandler.HandleException(error);
      })
    );

    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

  public ChangeCategoryFilterValue = (event: any) => this.store.dispatch(ChangeCategoryFilterValue({ value: event.value }));

  public ChangeStatusFilterValue = (event: any) => this.store.dispatch(ChangeStatusFilterValue({ value: event.value }));

  public DisplayStatus = (status: number) => this.statuses[status].name;

  public AddTask = () => this.router.navigate(['tasks/0']);

  public ModifyTask= (cgid: any) => this.router.navigate([`tasks/${cgid}`]);

  public DeleteTask = (tgid: any) => {
    this.deleteTGID = tgid,
    this.store.dispatch(deleteTask({ tgid: tgid }));
  }

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationDataTasks({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}