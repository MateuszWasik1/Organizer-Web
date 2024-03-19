import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { formatDate } from '@angular/common';
import { cleanState } from '../tasks-page-state/tasks-page-state.actions';
import { selectErrorMessage } from '../tasks-page-state/tasks-page-state.selectors';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})

export class TaskPageComponent implements OnInit, OnDestroy {
  title = 'Zadanie - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public form: FormGroup = new FormGroup({});
  public tgid: string = "";
  public isNewTaskView: boolean = true;

  public Task$ = this.store.select(selectTask);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.tgid = this.route.snapshot.paramMap.get('cgid') ?? "";
    this.isNewTaskView = this.tgid == "" || this.tgid == "0";

    if(!this.isNewTaskView)
      this.store.dispatch(loadTask({ TGID: this.tgid }));
    
    this.subscriptions.push(
      this.Category$.subscribe(x =>{
        this.form = new FormGroup({
          CGID: new FormControl( x.CGID, { validators: [] }),
          CName: new FormControl( x.CName, { validators: [ Validators.required, Validators.maxLength(2000) ] }),
          CStartDate: new FormControl( formatDate(x.CStartDate, 'yyyy-MM-dd', 'en'), { validators: [ Validators.required ] }),
          CEndDate: new FormControl( formatDate(x.CEndDate, 'yyyy-MM-dd', 'en'), { validators: [ Validators.required ] }),
          CBudget: new FormControl( x.CBudget, { validators: [ Validators.required ] }),
          CBudgetCount: new FormControl( x.CBudgetCount, { validators: [] }),
        })
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    )
  }

  public SaveSaving = () => {
    let model = {
      "CGID": this.form.get("CGID")?.value,
      "CName": this.form.get("CName")?.value,
      "CStartDate": this.form.get("CStartDate")?.value,
      "CEndDate": this.form.get("CEndDate")?.value,
      "CBudget": this.form.get("CBudget")?.value,
    }

    if(model.CGID == "0" || model.CGID == "")
      this.store.dispatch(addTask({ Category: model }));
    else
      this.store.dispatch(updateTask({ Category: model }));
  }

  public Cancel = () => this.router.navigate(["/tasks"])

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}