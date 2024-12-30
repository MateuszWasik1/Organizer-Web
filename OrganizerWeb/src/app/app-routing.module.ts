import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './components/category-page.component copy/categories-page.component';
import { CategoryPageComponent } from './components/category-page.component copy/category-page.component/category-page.component';
import { TasksPageComponent } from './components/tasks-page.component/tasks-page.component';
import { SavingsPageComponent } from './components/savings-page.component/savings-page.component';
import { StatsPageComponent } from './components/stats-page.component/stats-page.component';
import { RegisterComponent } from './components/account-page.component/register-page.component/register-page.component';
import { LoginComponent } from './components/account-page.component/login-page.component/login-page.component';
import { UserPageComponent } from './components/user-page.component/user-page.component';
import { UsersPageComponent } from './components/users-page.component/users-page.component';
import { BugsPageComponent } from './components/bugs-page.component/bugs-page.component';
import { BugPageComponent } from './components/bugs-page.component/bug-page.component/bug-page.component';
import { NotesPageComponent } from './components/notes-page.component/notes-page.component';
import { NotePageComponent } from './components/notes-page.component/note-page.component/note-page.component';
import { SavingPageComponent } from './components/savings-page.component/saving-page.component/saving-page.component';
import { TaskPageComponent } from './components/tasks-page.component/task-page.component/task-page.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Rejestracja',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Logowanie',
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
    title: 'Kategorie',
  },
  {
    path: 'categories/:cgid',
    component: CategoryPageComponent,
    title: 'Kategoria',
  },
  {
    path: 'tasks',
    component: TasksPageComponent,
    title: 'Zadania',
  },
  {
    path: 'tasks/:tgid',
    component: TaskPageComponent,
    title: 'Zadanie',
  },
  {
    path: 'savings',
    component: SavingsPageComponent,
    title: 'Oszczędności',
  },
  {
    path: 'savings/:sgid',
    component: SavingPageComponent,
    title: 'Oszczędność',
  },
  {
    path: 'stats',
    component: StatsPageComponent,
    title: 'Statystyki',
  },
  {
    path: 'user',
    component: UserPageComponent,
    title: 'Użytkownik',
  },
  {
    path: 'user/:ugid',
    component: UserPageComponent,
    title: 'Użytkownik',
  },
  {
    path: 'users',
    component: UsersPageComponent,
    title: 'Użytkownicy',
  },
  {
    path: 'bugs',
    component: BugsPageComponent,
    title: 'Błędy',
  },
  {
    path: 'bugs/:bgid',
    component: BugPageComponent,
    title: 'Błąd',
  },
  {
    path: 'notes',
    component: NotesPageComponent,
    title: 'Notatki',
  },
  {
    path: 'notes/:ngid',
    component: NotePageComponent,
    title: 'Notatka',
  },
  {
    path: '**',
    component: CategoriesPageComponent,
    title: 'Kategorie',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
