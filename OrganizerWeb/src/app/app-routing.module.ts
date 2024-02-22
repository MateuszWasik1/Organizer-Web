import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './components/category-page.component copy/categories-page.component';
import { TasksPageComponent } from './components/tasks-page.component/tasks-page.component';
import { SavingsPageComponent } from './components/savings-page.component/savings-page.component';
import { StatsPageComponent } from './components/stats-page.component/stats-page.component';
import { RegisterComponent } from './components/account-page.component/register-page.component/register-page.component';
import { LoginComponent } from './components/account-page.component/login-page.component/login-page.component';
import { UserPageComponent } from './components/user-page.component/user-page.component';
import { UsersPageComponent } from './components/users-page.component/users-page.component';
import { BugsPageComponent } from './components/bugs-page.component/bugs-page.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
  {
    path: 'user',
    component: UserPageComponent
  },
  {
    path: 'user/:ugid',
    component: UserPageComponent
  },
  {
    path: 'users',
    component: UsersPageComponent
  },
  {
    path: 'bugs',
    component: BugsPageComponent
  },
  {
    path: '**',
    component: CategoriesPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
