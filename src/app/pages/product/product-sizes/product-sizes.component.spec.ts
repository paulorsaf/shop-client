import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadProductSuccess } from 'src/app/store/product/product.actions';
import { productReducer } from 'src/app/store/product/product.reducers';
import { ProductSizesComponent } from './product-sizes.component';

describe('ProductSizesComponent', () => {
  let component: ProductSizesComponent;
  let fixture: ComponentFixture<ProductSizesComponent>;
  let page: PageMock;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSizesComponent ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('product', productReducer),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSizesComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    const product = {id: 1, stockOptions: [
      {size: 'P'}, {size: 'M'}, {size: 'M'}, {size: 'G'}, {size: 'G'}
    ]} as any;
    store.dispatch(loadProductSuccess({product}));

    fixture.detectChanges();
  }));

  it('given sizes loaded, then show sizes that are different', () => {
    expect(page.querySelectorAll('[test-id="size"]').length).toEqual(3);
  });

  it('given user selects size, then emit size changed event', () => {
    spyOn(component.sizeChanged, 'emit');

    component.setSize('M');

    expect(component.sizeChanged.emit).toHaveBeenCalled();
  });

  it('given show required error, when true, then show error', () => {
    component.showRequiredError = true;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="size-required-error"]')).not.toBeNull();
  });

});
