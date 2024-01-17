import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ChangeCategoryFilterValue, ChangeStatusFilterValue, deleteTask, loadCategories, loadCustomCategories, loadCustomTasks, loadTasks, saveTask, loadTasksNotes, saveTaskNote, deleteTaskNote } from './tasks-page-state/tasks-page-state.actions';
import { selectCategories, selectErrors, selectFilters, selectTasks, selectTasksNotes } from './tasks-page-state/tasks-page-state.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { MatDialog } from '@angular/material/dialog';
import { TasksFillDataDialogComponent } from './tasks-dialogs/tasks-fill-data-dialog.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  title = 'Zadania - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public form: FormGroup = new FormGroup({});
  public addTaskNote: FormGroup = new FormGroup({});
  public statuses: any;
  public selectedStatus: any;
  public selectedCategory: any;

  public selectedFilterStatus: any;
  public selectedFilterCategory: any;

  public categories: any = [];
  public IsBudgetExceeded: boolean = false;
  public budgetExceededInfo: string = '';

  public Filters$ = this.store.select(selectFilters);
  public Tasks$ = this.store.select(selectTasks);
  public TaskNotes$ = this.store.select(selectTasksNotes);
  public Categories$ = this.store.select(selectCategories);
  public Errors$ = this.store.select(selectErrors);

  constructor(public store: Store<AppState>, private dialog: MatDialog){
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadCategories());

    this.form = new FormGroup({
      tid: new FormControl(0, {validators: [] }),
      tgid: new FormControl('', {validators: [] }),
      tcgid: new FormControl('', {validators: [] }),
      tName: new FormControl('', {validators: [Validators.required] }),
      tTime: new FormControl(new Date(), {validators: [Validators.required] }),
      tLocalization: new FormControl('', {validators: [Validators.required] }),
      tBudget: new FormControl(0, {validators: [Validators.required] }),
      tStatus: new FormControl(0, {validators: [Validators.required] }),
    });

    this.addTaskNote = new FormGroup({
      taskNote: new FormControl('', { validators: [Validators.maxLength(2000)] }),
    })

    this.statuses = [
      {id: '0', name: 'Nie zaczęty'},
      {id: '1', name: 'W trakcie'},
      {id: '2', name: 'Skończony'},
      {id: '3', name: 'Wszystkie'},
    ];

    this.subscriptions.push(
      this.Filters$.subscribe(filter => this.store.dispatch(loadTasks())
    ));

    this.subscriptions.push(
      this.Categories$.subscribe(categories => this.categories = categories
    ));

    this.subscriptions.push(
      this.Errors$.subscribe(isErrors => {
        if(isErrors.IsTasksError || isErrors.IsCategoriesError)
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
          });
      })
    )
  }

  public ChangeCategoryFilterValue = (event: any) => this.store.dispatch(ChangeCategoryFilterValue({ value: event.value }));

  public ChangeStatusFilterValue = (event: any) => this.store.dispatch(ChangeStatusFilterValue({ value: event.value }));

  public DisplayStatus = (status: number) => this.statuses[status].name;

  public AddTask = () => {
    this.ShowAddModal = !this.ShowAddModal;

    this.form.get("tid")?.setValue(0);
    this.form.get("tgid")?.setValue(Guid.create().toString());
    this.form.get("tcgid")?.setValue('');
    this.form.get("tName")?.setValue('');
    this.form.get("tTime")?.setValue(new Date());
    this.form.get("tLocalization")?.setValue('');
    this.form.get("tBudget")?.setValue(0);
    this.form.get("tStatus")?.setValue(0);
  }

  public ModifyTask = (task: any) => {
    this.ShowAddModal = !this.ShowAddModal;

    this.store.dispatch(loadTasksNotes({ TGID: task.tgid }))

    this.form.get("tid")?.setValue(task.tid);
    this.form.get("tgid")?.setValue(task.tgid);
    this.form.get("tcgid")?.setValue(task.tcgid);
    this.form.get("tName")?.setValue(task.tName);
    this.form.get("tTime")?.setValue(task.tTime);
    this.form.get("tLocalization")?.setValue(task.tLocalization);
    this.form.get("tBudget")?.setValue(task.tBudget);
    this.form.get("tStatus")?.setValue(task.tStatus);
  }

  public Save = () => {
    let model = {
      "TID": this.form.get("tid")?.value,
      "TGID": this.form.get("tgid")?.value,
      "TCGID": this.selectedCategory,
      "TName": this.form.get("tName")?.value,
      "TTime": this.form.get("tTime")?.value,
      "TLocalization": this.form.get("tLocalization")?.value,
      "TBudget": this.form.get("tBudget")?.value,
      "TStatus": this.selectedStatus,
      "TUID": 0,
    }
    this.store.dispatch(saveTask({ Task: model }));
  }

  public TaskCategoryChange = (category: any) =>{
    let cat = this.categories.find((x: any) => x.cgid == category.value);

    if(cat.cBudget < cat.cBudgetCount + this.form.get("tBudget")?.value){
      this.IsBudgetExceeded = true;
      this.budgetExceededInfo = `W obecnej kategorii zaplanowany budżet to ${cat.cBudget}, przekraczasz budżet kategorii o ${(cat.cBudgetCount + this.form.get("tBudget")?.value) - cat.cBudget} !`
    }
    else
      this.IsBudgetExceeded = false;
  }

  public AddTaskNote = () => this.store.dispatch(saveTaskNote({ TNGID: Guid.create().toString(), TGID: this.form.get("tgid")?.value, TaskNote: this.addTaskNote.get("taskNote")?.value }));

  public DeleteTask = (tgid: any) => this.store.dispatch(deleteTask({ tgid: tgid }))

  public DeleteTaskNote = (tngid: any) => this.store.dispatch(deleteTaskNote({ TNGID: tngid }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
