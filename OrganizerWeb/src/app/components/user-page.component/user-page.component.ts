import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { cleanState, loadUser, loadUserByAdmin, saveUser, saveUserByAdmin } from './user-page-state/user-page-state.actions';
import { selectErrorMessage, selectUser } from './user-page-state/user-page-state.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  title = 'Użytkownik - P1 - Mateusz Wąsik';

  public IsAdminView: boolean = false;
  public roles: any;
  public selectedRole: any;
  public selectedFilterRole: any;
  public subscriptions: Subscription[];
  public form: FormGroup = new FormGroup({
    uid: new FormControl(0, {validators: [] }),
    ugid: new FormControl('', {validators: [] }),
    urid: new FormControl('', {validators: [] }),
    uFirstName: new FormControl('', {validators: [ Validators.maxLength(50) ] }),
    uLastName: new FormControl('', {validators: [ Validators.maxLength(50) ] }),
    uUserName: new FormControl({value: '', disabled: true}, {validators: [ Validators.required, Validators.maxLength(100) ] }),
    uEmail: new FormControl('', {validators: [ Validators.required, Validators.email, Validators.maxLength(100)  ] }),
    uPhone: new FormControl('', {validators: [ Validators.maxLength(100) ] }),
    uCategoriesCount: new FormControl(-1, {validators: [] }),
    uTasksCount: new FormControl(-1, {validators: [] }),
    uTaskNotesCount: new FormControl(-1, {validators: [] }),
    uSavingsCount: new FormControl(-1, {validators: [] }),
  });
  
  public User$ = this.store.select(selectUser);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>,
    public route: ActivatedRoute, 
    public router: Router, 
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.IsAdminView = this.route.snapshot.paramMap.get('ugid') != null;

    if(this.IsAdminView)
      this.store.dispatch(loadUserByAdmin({ ugid: this.route.snapshot.paramMap.get('ugid') }));
    else
      this.store.dispatch(loadUser());

    this.roles = [
      {id: '1', name: 'Użytkownik'},
      {id: '2', name: 'Wsparcie'},
      {id: '3', name: 'Admin'},
    ];

    this.subscriptions.push(this.User$.subscribe( user => {
      this.form.get("uid")?.setValue(user.uid);
      this.form.get("ugid")?.setValue(user.ugid);
      this.form.get("urid")?.setValue(this.roles[user.urid - 1 ?? 1].id);
      this.form.get("uFirstName")?.setValue(user.uFirstName);
      this.form.get("uLastName")?.setValue(user.uLastName);
      this.form.get("uUserName")?.setValue(user.uUserName);
      this.form.get("uEmail")?.setValue(user.uEmail);
      this.form.get("uPhone")?.setValue(user.uPhone);
      this.form.get("uCategoriesCount")?.setValue(user.uCategoriesCount);
      this.form.get("uTasksCount")?.setValue(user.uTasksCount);
      this.form.get("uTaskNotesCount")?.setValue(user.uTaskNotesCount);
      this.form.get("uSavingsCount")?.setValue(user.uSavingsCount);

      this.selectedRole = this.roles[user.urid - 1 ?? 0].id;
    }));

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );
  }
  
  public Save = () => {
    let model = {
      "UGID": '',
      "URID": '',
      "UFirstName": this.form.get("uFirstName")?.value,
      "ULastName": this.form.get("uLastName")?.value,
      "UUserName": this.form.get("uUserName")?.value,
      "UEmail": this.form.get("uEmail")?.value,
      "UPhone": this.form.get("uPhone")?.value,
    };

    if(this.IsAdminView){
      model.UGID = this.form.get("ugid")?.value
      model.URID = this.selectedRole
      this.store.dispatch(saveUserByAdmin({ User: model }));
    }
    else
      this.store.dispatch(saveUser({ User: model }));
  }

  public Cancel = () => this.router.navigate(['/users']);

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}