import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { ProductsEffects } from './products.effects';
import { ProductServiceMock } from 'src/app/model/mocks/product.service.mock';
import { ProductService } from 'src/app/services/product/product.service';
import { loadProductsByCategory, loadProductsByCategoryFail, loadProductsByCategorySuccess } from './products.actions';

describe('Products effects', () => {
  let effects: ProductsEffects;
  let actions$: Observable<Action>;
  let productService: ProductServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    productService = new ProductServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ProductsEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(ProductService, { useValue: productService });

    effects = TestBed.get(ProductsEffects);
  });

  describe('given load banners', () => {

    beforeEach(() => {
      actions$ = of(loadProductsByCategory({id: '1'}));
    });

    it('should loadPkce return retrieveAuthCode', (done) => {
      const products = {id: 1} as any;
      productService.response = of(products);

      effects.loadProductsByCategoryEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadProductsByCategorySuccess({products}));
        done();
      });
    });

    it('should retrieve auth code with success', (done) => {
      productService.response = throwError(error);

      effects.loadProductsByCategoryEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadProductsByCategoryFail({error}));
        done();
      });
    });

  });

});
