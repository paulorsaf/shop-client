import { Component, Input, OnInit } from '@angular/core';
import { SlideProduct } from '../model/slide-product';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {

  @Input() products: SlideProduct[];

  constructor() { }

  ngOnInit() {}

}
