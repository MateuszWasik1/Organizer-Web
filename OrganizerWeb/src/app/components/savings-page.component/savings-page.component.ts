import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';
import { MatDialog } from '@angular/material/dialog';
import { SavingsFillDataDialogComponent } from './savings-page-dialogs/savings-fill-data-dialog.component';
import { deleteSaving, loadCustomSavings, loadSavings, saveSaving } from './savings-page-state/savings-page-state.actions';
import { selectSavings, selectErrors, selectErrorMessage } from './savings-page-state/savings-page-state.selectors';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';

@Component({
  selector: 'app-savings-page',
  templateUrl: './savings-page.component.html',
  styleUrls: ['./savings-page.component.scss']
})
export class SavingsPageComponent implements OnInit, OnDestroy {
  title = 'Oszczędności - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public form: FormGroup = new FormGroup({});
  public filterForm: FormGroup = new FormGroup({});
  
  public Savings$ = this.store.select(selectSavings);
  public IsSavingsError$ = this.store.select(selectErrors);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    private dialog: MatDialog,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadSavings());

    this.form = new FormGroup({
      sid: new FormControl(0, {validators: [] }),
      sgid: new FormControl('', {validators: [] }),
      sAmount: new FormControl(0, {validators: [Validators.required] }),
      sTime: new FormControl(new Date(), {validators: [Validators.required] }),
      sOnWhat: new FormControl("", {validators: [] }),
      sWhere: new FormControl("", {validators: [] }),
    });

    this.subscriptions.push(
      this.IsSavingsError$.subscribe(isError => {
        if(isError)
          this.dialog
          .open(SavingsFillDataDialogComponent)
          .afterClosed()
          .subscribe(fill => {
            if(fill)
              this.store.dispatch(loadCustomSavings());
          });
      })
    )

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    )
  }

  public AddSaving = () => {
    this.ShowAddModal = !this.ShowAddModal;
    
    this.form.get("sid")?.setValue(0);
    this.form.get("sgid")?.setValue(Guid.create().toString());
    this.form.get("sAmount")?.setValue(0);
    this.form.get("sTime")?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.form.get("sOnWhat")?.setValue("");
    this.form.get("sWhere")?.setValue("");
  }

  public ModifySaving = (saving: any) => {
    this.ShowAddModal = !this.ShowAddModal;

    this.form.get("sid")?.setValue(saving.sid);
    this.form.get("sgid")?.setValue(saving.sgid);
    this.form.get("sAmount")?.setValue(saving.sAmount);
    this.form.get("sTime")?.setValue(formatDate(saving.sTime, 'yyyy-MM-dd', 'en'));
    this.form.get("sOnWhat")?.setValue(saving.sOnWhat);
    this.form.get("sWhere")?.setValue(saving.sWhere);
  }

  public Save = () => {
    let model = {
      "SID": this.form.get("sid")?.value,
      "SGID": this.form.get("sgid")?.value,
      "SAmount": this.form.get("sAmount")?.value,
      "STime": this.form.get("sTime")?.value,
      "SOnWhat": this.form.get("sOnWhat")?.value,
      "SWhere": this.form.get("sWhere")?.value,
    }
    this.store.dispatch(saveSaving({ saving: model }));
  }

  public DeleteSaving = (sGID: any) => this.store.dispatch(deleteSaving({ sGID: sGID }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}