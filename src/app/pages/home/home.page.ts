import { Component, OnInit } from '@angular/core';
import slideProductMock from './mock/slide-product.mock';
import trendingMock from './mock/trending.mock';
import { SlideProduct } from './model/slide-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slides: SlideProduct[] = slideProductMock;
  trending: SlideProduct[] = trendingMock;

  constructor() { }

  ngOnInit() {
  }

}
