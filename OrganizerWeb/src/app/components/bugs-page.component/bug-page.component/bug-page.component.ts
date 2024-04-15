import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectBug, selectBugNotes, selectBugsNotesCount, selectErrorMessage, selectFiltersBugNotes, selectUserRoles } from '../bugs-page-state/bugs-page-state.selectors';
import { changeBugStatus, cleanState, loadBug, loadBugNotes, loadUserRoles, saveBug, saveBugNote, updateBugNotesPaginationData } from '../bugs-page-state/bugs-page-state.actions';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BugStatusEnum } from "src/app/enums/BugStatusEnum"
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';

@Component({
  selector: 'app-bug-page',
  templateUrl: './bug-page.component.html',
  styleUrls: ['./bug-page.component.scss']
})
export class BugPageComponent implements OnInit, OnDestroy {
  title = 'Błąd - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public form: FormGroup = new FormGroup({});
  public addBugNote: FormGroup = new FormGroup({});
  public bgid: string = "";
  public count: number = 0;
  public isNewBugView: boolean = true;
  public selectedBugStatus: any;
  public bugStatusAdmin = [
    {id: '0', name: 'Nowy'},
    {id: '1', name: 'W weryfikacji'},
    {id: '2', name: 'Odrzucony'},
    {id: '3', name: 'Zaakceptowany'},
    {id: '4', name: 'W naprawie'},
    {id: '5', name: 'Naprawiony'},
  ]
  public bugStatusUser = [
    {id: '0', name: 'Nowy'},
  ]

  public Bug$ = this.store.select(selectBug);
  public BugNotes$ = this.store.select(selectBugNotes);
  public Filters$ = this.store.select(selectFiltersBugNotes);
  public Count$ = this.store.select(selectBugsNotesCount);
  public UserRoles$ = this.store.select(selectUserRoles);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.bgid = this.route.snapshot.paramMap.get('bgid') ?? "";
    this.isNewBugView = this.bgid == "" || this.bgid == "0";

    if(!this.isNewBugView){
      this.store.dispatch(loadBug({ bgid: this.bgid }));
      this.store.dispatch(loadBugNotes({ bgid: this.bgid }));
    }
    
    this.store.dispatch(loadUserRoles());

    this.subscriptions.push(
      this.Bug$.subscribe(x =>{
        this.form = new FormGroup({
          bguid: new FormControl( x.bguid, { validators: [] }),
          bTitle: new FormControl( { value: x.bTitle, disabled: !this.isNewBugView }, { validators: [ Validators.required, Validators.maxLength(200) ] }),
          bText:  new FormControl( { value: x.bText, disabled: !this.isNewBugView }, { validators: [ Validators.required, Validators.maxLength(4000) ] }),
          bStatus:  new FormControl( x.bStatus, { validators: [] }),
        })

        this.selectedBugStatus = this.bugStatusAdmin[x.bStatus].id
      })
    );

    this.addBugNote = new FormGroup({
      bugNote: new FormControl('', { validators: [ Validators.required, Validators.maxLength(4000) ] }),
    })

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );

    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadBugNotes({ bgid: this.bgid }))));
  }

  public ChangeColor = (IsStatusChange: boolean, status: number) => {
    if(!IsStatusChange)
      return ""

    let statuses = [
      { status: BugStatusEnum.New, color: "Status-New"},
      { status: BugStatusEnum.InVerification, color: "Status-InVerification"},
      { status: BugStatusEnum.Rejected, color: "Status-Rejected"},
      { status: BugStatusEnum.Accepted, color: "Status-Accepted"},
      { status: BugStatusEnum.InDevelopment, color: "Status-InDevelopment"},
      { status: BugStatusEnum.Fixed, color: "Status-Fixed"},
    ];

    let color = statuses[statuses.findIndex(x => x.status == status)].color

    return color
  }

  public SaveBug = () => {
    let model = {
      "BGID": this.form.get("bguid")?.value,
      "BTitle": this.form.get("bTitle")?.value,
      "BText": this.form.get("bText")?.value,
      "BStatus": this.form.get("bStatus")?.value,
    }
    
    this.store.dispatch(saveBug({ bug: model }));
  }

  public AddBugNote = () => {
    let model = {
      "BNBGID": this.form.get("bguid")?.value,
      "BNText": this.addBugNote.get("bugNote")?.value,
    }
    this.store.dispatch(saveBugNote({ BugNote: model }));
  }

  public ChangeBugStatus = (event: any) => {
    let model = {
      "BGID": this.form.get("bguid")?.value,
      "Status": event.value,
    }

    this.store.dispatch(changeBugStatus({ model: model }));
  }

  public Cancel = () => this.router.navigate(["/bugs"]);

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updateBugNotesPaginationData({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}
