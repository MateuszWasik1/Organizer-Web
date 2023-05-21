import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public username: any;
  public email: any;
  public password: any;
  public form = new FormGroup({
    fullName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(){
  };

  ngOnInit(): void {
  }
  public Save(){
    let model = {
      UFullName: this.form.get('fullName')?.value,
      UUserName: this.form.get('userName')?.value,
      UEmail: this.form.get('email')?.value,
      UPhone: this.form.get('phoneNumber')?.value,
      UPassword: this.form.get('password')?.value,
    }
    console.log(model);
  }
}