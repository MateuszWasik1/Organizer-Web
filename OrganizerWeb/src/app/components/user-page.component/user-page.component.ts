import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';
import { TranslationService } from 'src/app/services/translate.service';
import { loadUser, saveUser } from './user-page-state/user-page-state.actions';
import { selectUser } from './user-page-state/user-page-state.selectors';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  title = 'Użytkownik - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public form: FormGroup = new FormGroup({});
  
  public User$ = this.store.select(selectUser);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadUser());

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
    this.form.get("cid")?.setValue(0);
    this.form.get("cgid")?.setValue(Guid.create().toString());
    this.form.get("cName")?.setValue('');
    this.form.get("cStartDate")?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.form.get("cEndDate")?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.form.get("cBudget")?.setValue(0);
  }

  public ModifyCategory = (category: any) => {
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
    this.store.dispatch(saveUser({ User: model }));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
