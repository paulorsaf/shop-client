import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/product/product';
import { ShoppingCartProductStockOption } from 'src/app/model/shopping-cart-product/shopping-cart-product';

@Component({
  selector: 'app-purchase-stock-option',
  templateUrl: './purchase-stock-option.component.html',
  styleUrls: ['./purchase-stock-option.component.scss'],
})
export class PurchaseStockOptionComponent implements OnInit {

  @Input() stockOption: Stock | ShoppingCartProductStockOption;

  constructor() { }

  ngOnInit() {}

}
