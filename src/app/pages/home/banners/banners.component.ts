import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  slideOpts = {
    autoplay: {
      delay: 5000
    }
  }

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.banners$ = this.store.select(state => state.banner.banners);
  }

  goToProductPage(product: Banner) {
    this.router.navigate([`/products/${product.id}`]);
  }

}
