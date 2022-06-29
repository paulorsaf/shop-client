import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Trending } from 'src/app/model/trending/trending';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {

  slideOpts = {
    slidesPerView: 2.2
  };

  trendings$: Observable<Trending[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.trendings$ = this.store.select(state => state.trending.trendings);
  }

}
