import { Component, Input, OnInit } from '@angular/core';
import { SlideProduct } from '../model/slide-product';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @Input() slides: SlideProduct[];

  constructor() { }

  ngOnInit() {}

}
