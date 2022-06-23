import { Component, Input, OnInit } from '@angular/core';
import { SlideProduct } from '../model/slide-product';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {

  @Input() products: SlideProduct[];

  slideOpts = {
    slidesPerView: 2.2
  }

  constructor() { }

  ngOnInit() {}

}
