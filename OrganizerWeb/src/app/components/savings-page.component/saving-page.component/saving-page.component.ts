import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { addSaving, cleanState, loadSaving, updateSaving } from '../savings-page-state/savings-page-state.actions';
import { selectErrorMessage, selectSaving } from '../savings-page-state/savings-page-state.selectors';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-saving-page',
  templateUrl: './saving-page.component.html',
  styleUrls: ['./saving-page.component.scss']
})
export class SavingPageComponent implements OnInit, OnDestroy {
  title = 'Oszczędność - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public form: FormGroup = new FormGroup({});
  public sgid: string = "";
  public isNewSavingView: boolean = true;

  public Saving$ = this.store.select(selectSaving);
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
    this.sgid = this.route.snapshot.paramMap.get('sgid') ?? "";
    this.isNewSavingView = this.sgid == "" || this.sgid == "0";

    if(!this.isNewSavingView)
      this.store.dispatch(loadSaving({ SGID: this.sgid }));
    
    this.subscriptions.push(
      this.Saving$.subscribe(x =>{
        this.form = new FormGroup({
          SGID: new FormControl( x.SGID, { validators: [] }),
          SAmount: new FormControl( x.SAmount, { validators: [ Validators.required, Validators.min(0) ] }),
          STime: new FormControl( formatDate(x.STime, 'yyyy-MM-dd', 'en'), { validators: [] }),
          SOnWhat: new FormControl( x.SOnWhat, { validators: [] }),
          SWhere: new FormControl( x.SWhere, { validators: [] }),
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
      "SGID": this.form.get("SGID")?.value,
      "SAmount": this.form.get("SAmount")?.value,
      "STime": this.form.get("STime")?.value,
      "SOnWhat": this.form.get("SOnWhat")?.value,
      "SWhere": this.form.get("SWhere")?.value,
    }

    if(model.SGID == "0" || model.SGID == "")
      this.store.dispatch(addSaving({ Saving: model }));
    else
      this.store.dispatch(updateSaving({ Saving: model }));
  }

  public Cancel = () => this.router.navigate(["/savings"])

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}
