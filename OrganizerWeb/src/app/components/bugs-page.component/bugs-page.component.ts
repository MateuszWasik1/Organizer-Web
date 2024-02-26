import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { selectBugs, selectFilters, selectUserRoles } from './bugs-page-state/bugs-page-state.selectors';
import { changeBugsType, loadBugs, loadUserRoles } from './bugs-page-state/bugs-page-state.actions';
import { Router } from '@angular/router';
import { BugTypeEnum } from 'src/app/enums/BugTypeEnum';

@Component({
  selector: 'app-bugs-page',
  templateUrl: './bugs-page.component.html',
  styleUrls: ['./bugs-page.component.scss']
})
export class BugsPageComponent implements OnInit, OnDestroy {
  title = 'Błędy - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  
  public Bugs$ = this.store.select(selectBugs);
  public Filters$ = this.store.select(selectFilters);
  public UserRoles$ = this.store.select(selectUserRoles);

  public defaultBugsType: BugTypeEnum = BugTypeEnum.My;

  public bugsTypes = [
    {name: "Moje błędy", value: BugTypeEnum.My},
    {name: "Weryfikowane przeze mnie", value: BugTypeEnum.ImVerificator},
    {name: "Zamknięte", value: BugTypeEnum.Closed},
  ]

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadUserRoles());

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadBugs())))
  }

  public AddBug = () => this.router.navigate(['bugs/0'])

  public ModifyBug = (bgid: any) => this.router.navigate([`bugs/${bgid}`])

  public ChangeBugsType = (BugType: any) => this.store.dispatch(changeBugsType({ BugType: BugType.value }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
