import { Component, OnInit } from '@angular/core';
import categoriesMock from '../mock/categories.mock';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categories = categoriesMock;

  constructor() { }

  ngOnInit() {}

}
