import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { loadCategories } from 'src/app/store/category/category.actions';
import { loadProductsByCategory } from 'src/app/store/products/products.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  category$: Observable<Category>;
  isLoading$: Observable<boolean>;
  products$: Observable<Product[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.category$ = this.store.select(state => state.category.categories?.find(c => c.id === id));
    this.isLoading$ = this.store.select(state => state.products.isLoading);
    this.products$ = this.store.select(state => state.products.products);

    this.store.dispatch(loadCategories());
    this.store.dispatch(loadProductsByCategory({id}));
  }

}
