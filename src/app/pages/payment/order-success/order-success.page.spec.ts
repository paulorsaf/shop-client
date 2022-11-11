import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { BlankMockComponent } from 'src/app/model/mocks/blank-mock/blank-mock.component';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { OrderSuccessPage } from './order-success.page';

describe('OrderSuccessPage', () => {
  let component: OrderSuccessPage;
  let fixture: ComponentFixture<OrderSuccessPage>;
  let page: PageMock;
  let location: Location;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSuccessPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'home', component: BlankMockComponent },
          { path: 'purchases', component: BlankMockComponent },
        ]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSuccessPage);
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('given user clicks on home button, then go to home', done => {
    page.querySelector('[test-id="home-button"]').click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(location.path()).toEqual('/home');
      done();
    }, 100)
  })

  it('given user clicks on home button, then clear purchase details', done => {
    page.querySelector('[test-id="home-button"]').click();
    fixture.detectChanges();

    store.select('shoppingCart').subscribe(state => {
      expect(state.products).toEqual([]);
      done();
    })
  })

});
