import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { loadUser, loadUserByAdmin, saveUser } from './user-page-state/user-page-state.actions';
import { selectUser } from './user-page-state/user-page-state.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  title = 'Użytkownik - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public form: FormGroup = new FormGroup({
    uid: new FormControl(0, {validators: [] }),
    ugid: new FormControl('', {validators: [] }),
    urid: new FormControl(0, {validators: [] }),
    uFirstName: new FormControl('', {validators: [] }),
    uLastName: new FormControl('', {validators: [] }),
    uUserName: new FormControl({value: '', disabled: true}, {validators: [Validators.required] }),
    uEmail: new FormControl('', {validators: [Validators.required] }),
    uPhone: new FormControl('', {validators: [] }),
    uCategoriesCount: new FormControl(-1, {validators: [] }),
    uTasksCount: new FormControl(-1, {validators: [] }),
    uTaskNotesCount: new FormControl(-1, {validators: [] }),
    uSavingsCount: new FormControl(-1, {validators: [] }),
  });
  
  public User$ = this.store.select(selectUser);

  constructor(public store: Store<AppState>,
    public route: ActivatedRoute, 
    public translations: TranslationService)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    let ugid = this.route.snapshot.paramMap.get('ugid');

    if(ugid == null)
      this.store.dispatch(loadUser());
    else
      this.store.dispatch(loadUserByAdmin({ ugid: ugid }));

    this.subscriptions.push(this.User$.subscribe( user => {
      this.form.get("uFirstName")?.setValue(user.uFirstName);
      this.form.get("uLastName")?.setValue(user.uLastName);
      this.form.get("uUserName")?.setValue(user.uUserName);
      this.form.get("uEmail")?.setValue(user.uEmail);
      this.form.get("uPhone")?.setValue(user.uPhone);
    }))
  }
  public Save = () => {
    let model = {
      "UFirstName": this.form.get("uFirstName")?.value,
      "ULastName": this.form.get("uLastName")?.value,
      "UUserName": this.form.get("uUserName")?.value,
      "UEmail": this.form.get("uEmail")?.value,
      "UPhone": this.form.get("uPhone")?.value,
    }
    this.store.dispatch(saveUser({ User: model }));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
