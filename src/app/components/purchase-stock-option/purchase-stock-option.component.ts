import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/product/product';

@Component({
  selector: 'app-purchase-stock-option',
  templateUrl: './purchase-stock-option.component.html',
  styleUrls: ['./purchase-stock-option.component.scss'],
})
export class PurchaseStockOptionComponent implements OnInit {

  @Input() stockOption: Stock;

  constructor() { }

  ngOnInit() {}

}
