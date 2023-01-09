import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { loadCategories } from 'src/app/store/category/category.actions';
import { loadProductsByCategory } from 'src/app/store/products/products.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  category$: Observable<Category>;
  isLoading$: Observable<boolean>;
  products$: Observable<Product[]>;

  hasBackButton = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private navController: NavController,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.hasBackButton = (this.location.getState() as any)?.navigationId !== 1;
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.category$ = this.store.select(state => state.category.categories?.find(c => c.id === id));
    this.isLoading$ = this.store.select(state => state.products.isLoading);
    this.products$ = this.store.select(state => state.products.products);

    this.store.dispatch(loadCategories());
    this.store.dispatch(loadProductsByCategory({id}));
  }

  goHome() {
    this.navController.navigateRoot('/');
  }

  goToProduct(product: {id: string}) {
    this.router.navigate([`/products/${product.id}`]);
  }

}
