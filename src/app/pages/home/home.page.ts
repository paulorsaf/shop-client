import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Trending } from 'src/app/model/trending/trending';
import { AppState } from 'src/app/store/app-state';
import { loadBanners } from 'src/app/store/banner/banner.actions';
import { loadCategories } from 'src/app/store/category/category.actions';
import { clearPurchaseDetail } from 'src/app/store/purchase-detail/purchase-detail.action';
import { loadTrendingss } from 'src/app/store/trending/trending.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter {

  isLoading$: Observable<boolean>;
  isLoadingCategories$: Observable<boolean>;
  isLoadingTrendings$: Observable<boolean>;

  trendings$: Observable<Trending[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.banner.isLoading);
    this.isLoadingCategories$ = this.store.select(state => state.category.isLoading);
    this.isLoadingTrendings$ = this.store.select(state => state.trending.isLoading);

    this.trendings$ = this.store.select(state => state.trending.trendings);

    this.store.dispatch(loadBanners());
    this.store.dispatch(loadCategories());
    this.store.dispatch(loadTrendingss());
  }

  ionViewDidEnter(): void {
    this.store.dispatch(clearPurchaseDetail());
  }

};
