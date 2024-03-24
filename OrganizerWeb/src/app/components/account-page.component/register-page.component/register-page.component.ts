import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { RegisterUser } from '../account-page-state/account-page-state.actions';
import { PasswordConsistency, PatternValidator } from 'src/app/validators/forms.validator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { selectErrorMessage } from '../account-page-state/account-page-state.selectors';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'Rejestracja - P1 - Mateusz Wąsik';
  
  public subscriptions: Subscription[];

  public IsPasswordsEqual: boolean = true;

  public ErrorMessage$ = this.store.select(selectErrorMessage);

  public form = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [ Validators.required, Validators.email, Validators.maxLength(100) ]),
    password: new FormControl('', 
      [
        Validators.required, 
        Validators.minLength(8),
        PatternValidator(new RegExp("(?=.*[0-9])"), {
          requiresDigit: true
        }),
        PatternValidator(new RegExp("(?=.*[A-Z])"), {
          requiresUppercase: true
        }),
        PatternValidator(new RegExp("(?=.*[a-z])"), {
          requiresLowercase: true
        }),
        PatternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
          requiresSpecialChars: true
        })
      ]
    ),
    password2: new FormControl('', 
      [
        Validators.required, 
        Validators.minLength(8),
        PatternValidator(new RegExp("(?=.*[0-9])"), {
          requiresDigit: true
        }),
        PatternValidator(new RegExp("(?=.*[A-Z])"), {
          requiresUppercase: true
        }),
        PatternValidator(new RegExp("(?=.*[a-z])"), {
          requiresLowercase: true
        }),
        PatternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
          requiresSpecialChars: true
        })
      ]
    ),
  }, 
  {
    validators: PasswordConsistency
  });

  constructor(public store: Store<AppState>, 
    public translations: TranslationService, 
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = [];
  }
  
  ngOnInit(): void {
    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    )
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