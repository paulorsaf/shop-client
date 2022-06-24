import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadCategoriesSuccess } from 'src/app/store/category/category.actions';
import { categoryReducer } from 'src/app/store/category/category.reducers';
import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let page: PageMock;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('category', categoryReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    const categories = <any> [{id: 1}, {id: 2}]
    store.dispatch(loadCategoriesSuccess({categories}));

    fixture.detectChanges();
  }));

  it('given categories, then show categories items', () => {
    expect(page.querySelectorAll('[test-id="category"]').length).toEqual(2);
  })

  // it('given user clicks on product, then go to product page', done => {
  //   page.querySelectorAll('[test-id="trending"]')[0].click();
  //   fixture.detectChanges();

  //   setTimeout(() => {
  //     expect(location.path()).toEqual('/products/1');
  //     done();
  //   }, 100)
  // })

});
