import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadBannersSuccess } from 'src/app/store/banner/banner.actions';
import { bannerReducer } from 'src/app/store/banner/banner.reducers';
import { ProductPage } from '../../product/product.page';
import { BannersComponent } from './banners.component';

describe('BannersComponent', () => {
  let component: BannersComponent;
  let fixture: ComponentFixture<BannersComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BannersComponent],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'products/:id', component: ProductPage
        }]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('banner', bannerReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BannersComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    const banners = [{id: 1}, {id: 2}] as any;
    store.dispatch(loadBannersSuccess({banners}));
    fixture.detectChanges();
  }));

  it('given banners, then show banners list', () => {
    expect(page.querySelectorAll('[test-id="banner"]').length).toEqual(2);
  });

  it('given user clicks on banner action button, then go to product page', done => {
    page.querySelectorAll('[test-id="action-button"]')[0].click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(location.path()).toEqual('/products/1');
      done();
    }, 100);
  });

});
