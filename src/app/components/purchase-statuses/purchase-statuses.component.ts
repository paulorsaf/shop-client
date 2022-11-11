import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Company } from 'src/app/model/company/company';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-purchase-statuses',
  templateUrl: './purchase-statuses.component.html',
  styleUrls: ['./purchase-statuses.component.scss'],
})
export class PurchaseStatusesComponent implements OnInit {

  @Input() purchase: Purchase;

  company$: Observable<Company>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.company$ = this.store.select(state => state.organization.selectedCompany)
      .pipe(tap(console.log));
  }

}
