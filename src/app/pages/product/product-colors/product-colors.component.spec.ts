import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadProductSuccess } from 'src/app/store/product/product.actions';
import { productReducer } from 'src/app/store/product/product.reducers';
import { ProductColorsComponent } from './product-colors.component';

describe('ProductColorsComponent', () => {
  let component: ProductColorsComponent;
  let fixture: ComponentFixture<ProductColorsComponent>;
  let page: PageMock;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductColorsComponent
      ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('product', productReducer),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductColorsComponent);
    store = TestBed.inject(Store);
    
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    const product = {id: 1, stock: [
      {color: 'Amarelo'}, {color: 'Verde'}, {color: 'Vermelho'}
    ]} as any;
    store.dispatch(loadProductSuccess({product}));

    fixture.detectChanges();
  }));

  describe('given stock options dont have size', () => {

    it('given colors loaded, then show colors', () => {
      expect(page.querySelectorAll('[test-id="color"]').length).toEqual(3);
    });

  });

  describe('given stock options have size', () => {

    beforeEach(() => {
      const product = {id: 1, stock: [
        {size: 'P', color: 'Amarelo'}, {size: 'P', color: 'Verde'}, {size: 'M', color: 'Vermelho'}
      ]} as any;
      store.dispatch(loadProductSuccess({product}));
      component.selectedSize$.next('P');

      fixture.detectChanges();
    })

    it('when size selected, then show only colors for that size', () => {
      expect(page.querySelectorAll('[test-id="color"]').length).toEqual(2);
    });

  });

  it('given user selects color, then emit color changed event', () => {
    spyOn(component.colorChanged, 'emit');

    page.querySelectorAll('ion-icon')[1].click();
    fixture.detectChanges();

    expect(component.colorChanged.emit).toHaveBeenCalled();
  });

  it('given color selected, then mark color as selected', () => {
    component.selectedColor = "Verde";
    fixture.detectChanges();

    expect(page.querySelectorAll('ion-icon')[1]).toHaveClass('selected');
  });

  it('given show required error, when true, then show error', () => {
    component.showRequiredError = true;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="color-required-error"]')).not.toBeNull();
  });

});
