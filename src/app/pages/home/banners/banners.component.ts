import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Banner } from 'src/app/model/banner/banner';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {

  banners$: Observable<Banner[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.banners$ = this.store.select(state => state.banner.banners);
  }

}
