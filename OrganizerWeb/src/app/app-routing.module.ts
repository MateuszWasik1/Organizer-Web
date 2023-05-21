import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register-component/register.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: mainPageComponent
  // },
  {
    path: 'register',
    component: RegisterComponent
  },
  // {
  //   path: '**',
  //   component: RegisterComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
