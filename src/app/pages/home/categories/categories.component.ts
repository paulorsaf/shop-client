import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.categories$ = this.store.select(state => state.category.categories);
  }

  goToCategoryPage(category: Category) {
    this.router.navigate([`/categories/${category.id}`]);
  }

}
