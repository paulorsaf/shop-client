import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { loadBanners } from 'src/app/store/banner/banner.actions';
import { loadCategories } from 'src/app/store/category/category.actions';
import { loadTrendings } from 'src/app/store/trending/trending.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isLoading$: Observable<boolean>;
  isLoadingCategories$: Observable<boolean>;
  isLoadingTrendings$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.banner.isLoading);
    this.isLoadingCategories$ = this.store.select(state => state.category.isLoading);
    this.isLoadingTrendings$ = this.store.select(state => state.trending.isLoading);

    this.store.dispatch(loadBanners());
    this.store.dispatch(loadCategories());
    this.store.dispatch(loadTrendings());
  }

}