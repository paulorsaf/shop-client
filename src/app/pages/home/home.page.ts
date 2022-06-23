import { Component, OnInit } from '@angular/core';
import { SlideProduct } from './model/slide-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slides: SlideProduct[] = [{
    image: "https://lojausereserva.vtexassets.com/arquivos/ids/6760952/0065478054_01.jpg?v=637909209080630000",
    name: "Produto 1",
    price: {
      currency: "R$",
      value: 300
    },
    discount: {
      currency: "R$",
      value: 200
    }
  }, {
    image: "https://cdn.pixabay.com/photo/2018/03/01/14/57/portrait-3190849__480.jpg",
    name: "Produto 2",
    price: {
      currency: "R$",
      value: 300
    },
    discount: {
      currency: "R$",
      value: 200
    }
  }, {
    image: "https://cdn.pixabay.com/photo/2016/11/14/03/06/woman-1822459__480.jpg",
    name: "Produto 3",
    price: {
      currency: "R$",
      value: 300
    },
    discount: {
      currency: "R$",
      value: 200
    }
  }];

  constructor() { }

  ngOnInit() {
  }

}
