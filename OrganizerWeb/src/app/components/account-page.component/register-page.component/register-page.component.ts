import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { RegisterUser } from '../account-page-state/account-page-state.actions';
import { PasswordConsistency } from 'src/app/validators/forms.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'Rejestracja - P1 - Mateusz Wąsik';

  public IsPasswordsEqual: boolean = true;

  public form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, 
  {
    validators: PasswordConsistency
  });

  constructor(public store: Store<AppState>, 
    public translations: TranslationService, 
    public router: Router)
  {
  }
  
  ngOnInit(): void {
  }

  public Clear = () => {
    this.form.get('userName')?.setValue('');
    this.form.get('email')?.setValue('');
    this.form.get('password')?.setValue('');
    this.form.get('password2')?.setValue('');
  }

  public Save = () => {
    let model = {
      UUserName: this.form.get('userName')?.value,
      UEmail: this.form.get('email')?.value,
      UPassword: this.form.get('password')?.value,
    }
    
    this.store.dispatch(RegisterUser({ user: model }));
  }

  public GoToLogin = () => this.router.navigate(['/login']);
}