import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ProductPage } from '../../product/product.page';
import { TrendingComponent } from './trending.component';

describe('TrendingComponent', () => {
  let component: TrendingComponent;
  let fixture: ComponentFixture<TrendingComponent>;
  let location: Location;
  let page: {querySelector: Function, querySelectorAll: Function};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrendingComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'products/:id',
          component: ProductPage
        }]),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingComponent);
    location = TestBed.inject(Location);
    
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    component.products = <any> [
      {id: 1, price: {}, discount: {}},
      {id: 2, price: {}, discount: {}}
    ];
    
    fixture.detectChanges();
  }));

  it('given product list, then show products', () => {
    expect(page.querySelectorAll('[test-id="product"]').length).toEqual(2);
  })

  it('given user clicks on product, then go to product page', done => {
    page.querySelectorAll('[test-id="product"]')[0].click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(location.path()).toEqual('/products/1');
      done();
    }, 100)
  })

});
