import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { Company } from './model/company/company';
import { User } from './model/user/user';
import { AppState } from './store/app-state';
import { loginUserByToken, logout } from './store/user/user.actions';
import { loadOrganizationCompanies } from './store/organization/organization.action';
import { OrganizationPage } from './pages/organization/organization.page';
import { loadBanners } from './store/banner/banner.actions';
import { loadCategories } from './store/category/category.actions';
import { loadTrendingss } from './store/trending/trending.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  company$: Observable<Company>;
  isLoggingUserByToken$!: Observable<boolean>;
  isMultiCompany$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isMultiCompany$ = this.store.select(state => state.organization.companies?.length > 1);
    this.company$ = this.store.select(state => state.organization.selectedCompany);
    this.isLoggingUserByToken$ = this.store.select(state => state.user.isLoggingInByToken);
    this.user$ = this.store.select(state => state.user.user);

    this.store.dispatch(loginUserByToken());
    this.store.dispatch(loadOrganizationCompanies());
  }

  async openLogin() {
    this.menu.close();
    const modal = await this.modalController.create({
      component: LoginComponent
    })
    modal.present();
  }

  async openChangeCompany() {
    this.menu.close();
    const modal = await this.modalController.create({
      component: OrganizationPage
    })
    modal.present();
    modal.onWillDismiss().then(() => {
      this.store.dispatch(loadBanners());
      this.store.dispatch(loadCategories());
      this.store.dispatch(loadTrendingss());
    })
  }

  logout() {
    this.menu.close();
    this.store.dispatch(logout());
  }

  goToPage(page: string) {
    this.router.navigate([page]);
    this.menu.close();
  }

}
