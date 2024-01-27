import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register-component/register.component';
import { CategoriesPageComponent } from './components/category-page.component copy/categories-page.component';
import { TasksPageComponent } from './components/tasks-page.component/tasks-page.component';
import { SavingsPageComponent } from './components/savings-page.component/savings-page.component';
import { StatsPageComponent } from './components/stats-page.component/stats-page.component';
import { AccountComponent } from './components/account-page.component/account-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: mainPageComponent
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  {
    path: 'register',
    component: AccountComponent
  },
  {
    path: 'categories',
    component: CategoriesPageComponent
  },
  {
    path: 'tasks',
    component: TasksPageComponent
  },
  {
    path: 'savings',
    component: SavingsPageComponent
  },
  {
    path: 'stats',
    component: StatsPageComponent
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
