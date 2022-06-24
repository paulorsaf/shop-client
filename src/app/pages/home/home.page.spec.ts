import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { loadBannersSuccess } from 'src/app/store/banner/banner.actions';
import { bannerReducer } from 'src/app/store/banner/banner.reducers';
import { loadCategoriesSuccess } from 'src/app/store/category/category.actions';
import { categoryReducer } from 'src/app/store/category/category.reducers';
import { loadTrendingsSuccess } from 'src/app/store/trending/trending.actions';
import { trendingReducer } from 'src/app/store/trending/trending.reducers';
import { BannersComponent } from './banners/banners.component';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let store: Store<AppState>;
  let page: {querySelector: Function, querySelectorAll: Function};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        BannersComponent
      ],
      imports: [
        StoreModule.forRoot([]),
        StoreModule.forFeature('banner', bannerReducer),
        StoreModule.forFeature('category', categoryReducer),
        StoreModule.forFeature('trending', trendingReducer),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    store = TestBed.get(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  describe('given page starts', () => {

    it('then load banners', done => {
      store.select('banner').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    })

    it('then load trendings', done => {
      store.select('trending').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    })

    it('then load categories', done => {
      store.select('category').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    })

  })

  describe('given loading banners', () => {

    it('then show banners loader', () => {
      expect(page.querySelector('[test-id="banners-loader"]')).not.toBeNull();
    })

    it('then hide banners', () => {
      expect(page.querySelector('[test-id="banners"]')).toBeNull();
    })

  })

  describe('given banners loaded', () => {

    beforeEach(() => {
      const banners = <any> [{id: 1}, {id: 2}];
      store.dispatch(loadBannersSuccess({banners}));
      fixture.detectChanges();
    })

    it('then hide banners loader', () => {
      expect(page.querySelector('[test-id="banners-loader"]')).toBeNull();
    })

    it('then show banners', () => {
      expect(page.querySelector('[test-id="banners"]')).not.toBeNull();
    })

  })

  describe('given loading trendings', () => {

    it('then show trendings loader', () => {
      expect(page.querySelector('[test-id="trendings-loader"]')).not.toBeNull();
    })

    it('then hide trendings', () => {
      expect(page.querySelector('[test-id="trendings"]')).toBeNull();
    })

  })

  describe('given trendings loaded', () => {

    beforeEach(() => {
      const trendings = <any> [{id: 1}, {id: 2}];
      store.dispatch(loadTrendingsSuccess({trendings}));
      fixture.detectChanges();
    })

    it('then hide trendings loader', () => {
      expect(page.querySelector('[test-id="trendings-loader"]')).toBeNull();
    })

    it('then show trendings', () => {
      expect(page.querySelector('[test-id="trendings"]')).not.toBeNull();
    })

  })

  describe('given loading categories', () => {

    it('then show categories loader', () => {
      expect(page.querySelector('[test-id="categories-loader"]')).not.toBeNull();
    })

    it('then hide categories', () => {
      expect(page.querySelector('[test-id="categories"]')).toBeNull();
    })

  })

  describe('given categories loaded', () => {

    beforeEach(() => {
      const categories = <any> [{id: 1}, {id: 2}];
      store.dispatch(loadCategoriesSuccess({categories}));
      fixture.detectChanges();
    })

    it('then hide categories loader', () => {
      expect(page.querySelector('[test-id="categories-loader"]')).toBeNull();
    })

    it('then show categories', () => {
      expect(page.querySelector('[test-id="categories"]')).not.toBeNull();
    })

  })

});