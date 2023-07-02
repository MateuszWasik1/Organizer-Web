import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadTasks, saveTask } from './tasks-page-state/tasks-page-state.actions';
import { selectTasks } from './tasks-page-state/tasks-page-state.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  title = 'Taski - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public form: FormGroup = new FormGroup({});
  
  public Tasks$ = this.store.select(selectTasks)

  constructor(public store: Store<AppState>){
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadTasks());

    this.form = new FormGroup({
      cid: new FormControl(0, {validators: [] }),
      cgid: new FormControl('', {validators: [] }),
      cName: new FormControl('', {validators: [Validators.required] }),
      cStartDate: new FormControl(new Date(), {validators: [Validators.required] }),
      cEndDate: new FormControl(new Date(), {validators: [Validators.required] }),
      cBudget: new FormControl(0, {validators: [Validators.required] }),
    });
  }

  public AddCategory = () => {
    this.ShowAddModal = !this.ShowAddModal;
    
    this.form.get("cid")?.setValue(0);
    this.form.get("cgid")?.setValue(Guid.create().toString());
    this.form.get("cName")?.setValue('');
    this.form.get("cStartDate")?.setValue(new Date());
    this.form.get("cEndDate")?.setValue(new Date());
    this.form.get("cBudget")?.setValue(0);
  }

  public ModifyCategory = (category: any) => {
    this.ShowAddModal = !this.ShowAddModal;

    this.form.get("cid")?.setValue(category.cid);
    this.form.get("cgid")?.setValue(category.cgid);
    this.form.get("cName")?.setValue(category.cName);
    this.form.get("cStartDate")?.setValue(formatDate(category.cStartDate, 'yyyy-MM-dd', 'en'));
    this.form.get("cEndDate")?.setValue(formatDate(category.cEndDate, 'yyyy-MM-dd', 'en'));
    this.form.get("cBudget")?.setValue(category.cBudget);
  }

  public Save = () => {
    let model = {
      "CID": this.form.get("cid")?.value,
      "CGID": this.form.get("cgid")?.value,
      "CName": this.form.get("cName")?.value,
      "CStartDate": this.form.get("cStartDate")?.value,
      "CEndDate": this.form.get("cEndDate")?.value,
      "CBudget": this.form.get("cBudget")?.value,
    }
    this.store.dispatch(saveTask({ Task: model }));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
