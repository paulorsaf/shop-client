import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { loadBanners } from 'src/app/store/banner/banner.actions';
import { loadTrendings } from 'src/app/store/trending/trending.actions';
import slideProductMock from './mock/slide-product.mock';
import trendingMock from './mock/trending.mock';
import { SlideProduct } from './model/slide-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isLoading$: Observable<boolean>;
  isLoadingTrendings$: Observable<boolean>;

  slides: SlideProduct[] = slideProductMock;
  trending: SlideProduct[] = trendingMock;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.banner.isLoading);
    this.isLoadingTrendings$ = this.store.select(state => state.trending.isLoading);

    this.store.dispatch(loadBanners());
    this.store.dispatch(loadTrendings());
  }

}