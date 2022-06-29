import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadTrendingsSuccess } from 'src/app/store/trending/trending.actions';
import { trendingReducer } from 'src/app/store/trending/trending.reducers';
import { ProductPage } from '../../product/product.page';
import { TrendingComponent } from './trending.component';

describe('TrendingComponent', () => {
  let component: TrendingComponent;
  let fixture: ComponentFixture<TrendingComponent>;
  let page: PageMock;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrendingComponent
      ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('trending', trendingReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    const trendings = [{id: 1}, {id: 2}] as any;
    store.dispatch(loadTrendingsSuccess({trendings}));

    fixture.detectChanges();
  }));

  it('given product list, then show products', () => {
    expect(page.querySelectorAll('app-product-card').length).toEqual(2);
  });

});
