import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product/product';
import { Trending } from 'src/app/model/trending/trending';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product | Trending;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  goToProduct(product: {id: string}) {
    this.router.navigate([`/products/${product.id}`]);
  }

}
