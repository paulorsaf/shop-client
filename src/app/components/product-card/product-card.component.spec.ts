import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { ProductPage } from 'src/app/pages/product/product.page';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let page: PageMock;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'products/:id',
          component: ProductPage
        }]),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    component.product = {id: 1, image: 'url'} as any;
    fixture.detectChanges();
  }));

  it('given user clicks on product, then go to product page', done => {
    page.querySelector('[test-id="product"]').click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(location.path()).toEqual('/products/1');
      done();
    }, 100);
  });

});
