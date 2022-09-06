import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { shoppingCartReducer } from 'src/app/store/shopping-cart/shopping-cart.reducers';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let page: PageMock;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('shoppingCart', shoppingCartReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  xit('given has search button, then show search button', () => {
    component.hasSearchButton = true;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="search-button"]')).not.toBeNull();
  });

  it('given doesnt have search button, then hide search button', () => {
    component.hasSearchButton = false;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="search-button"]')).toBeNull();
  });

  it('given user clicks on shopping cart button, then open shopping cart', done => {
    fixture.detectChanges();

    page.querySelector('[test-id="shopping-cart-button"]').click();
    fixture.detectChanges();

    store.select('shoppingCart').subscribe(state => {
      expect(state.isOpen).toBeTruthy();
      done();
    });
  });

});
