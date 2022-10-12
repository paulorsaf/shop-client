import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  aboutUs$: Observable<string>;

  hasBackButton = true;

  constructor(
    private location: Location,
    private navController: NavController,
    private store: Store<AppState>
  ) {
    this.hasBackButton = (this.location.getState() as any)?.navigationId !== 1;
  }

  ngOnInit() {
    this.aboutUs$ = this.store.select(state => state.organization.selectedCompany?.aboutUs || "");
  }

  goHome() {
    this.navController.navigateRoot('/');
  }

}