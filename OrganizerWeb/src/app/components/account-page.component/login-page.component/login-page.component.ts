import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { Login } from '../account-page-state/account-page-state.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../account-page.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Kategorie - P1 - Mateusz Wąsik';

  public form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
    this.form.get('password')?.setValue('');
  }

  public Login = () => {
    let model = {
      UUserName: this.form.get('userName')?.value,
      UPassword: this.form.get('password')?.value,
    }
    
    this.store.dispatch(Login({ user: model }));
  }
  public GoToRegistration = () => this.router.navigate(['/register'])
}