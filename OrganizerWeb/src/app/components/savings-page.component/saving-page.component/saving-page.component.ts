import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { selectBug, selectBugNotes, selectErrorMessage, selectUserRoles } from '../bugs-page-state/bugs-page-state.selectors';
// import { changeBugStatus, cleanState, loadBug, loadBugNotes, loadUserRoles, saveBug, saveBugNote } from '../bugs-page-state/bugs-page-state.actions';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { cleanState } from '../savings-page-state/savings-page-state.actions';

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

  public Bug$ = this.store.select(selectBug);
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

    if(!this.isNewSavingView){
      this.store.dispatch(loadBug({ bgid: this.bgid }));
      this.store.dispatch(loadBugNotes({ bgid: this.bgid }));
    }
    
    this.subscriptions.push(
      this.Bug$.subscribe(x =>{
        this.form = new FormGroup({
          bguid: new FormControl( x.bguid, { validators: [] }),
          bTitle: new FormControl( { value: x.bTitle, disabled: !this.isNewBugView }, { validators: [Validators.maxLength(200)] }),
          bText:  new FormControl( { value: x.bText, disabled: !this.isNewBugView }, { validators: [Validators.maxLength(4000)] }),
          bStatus:  new FormControl( x.bStatus, { validators: [] }),
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
      "BGID": this.form.get("bguid")?.value,
      "BTitle": this.form.get("bTitle")?.value,
      "BText": this.form.get("bText")?.value,
      "BStatus": this.form.get("bStatus")?.value,
    }
    
    this.store.dispatch(saveSaving({ Saving: model }));
  }

  public Cancel = () => this.router.navigate(["/savings"])

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}
