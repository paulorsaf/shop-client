import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company/company';
import { AppState } from 'src/app/store/app-state';
import { loadOrganizationCompanies, setSelectedCompany } from 'src/app/store/organization/organization.action';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {

  companies$: Observable<Company[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.companies$ = this.store.select(state => state.organization.companies);
    this.isLoading$ = this.store.select(state => state.organization.isLoading);
  }

  selectCompany(company: Company) {
    this.store.dispatch(setSelectedCompany({company}));
    this.modalController.dismiss();
  }

}
