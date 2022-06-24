import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { ProductEffects } from './product.effects';
import { loadProduct, loadProductFail, loadProductSuccess } from './product.actions';
import { ProductServiceMock } from 'src/app/model/mocks/product.service.mock';
import { ProductService } from 'src/app/services/product/product.service';

describe('Product effects', () => {
  let effects: ProductEffects;
  let actions$: Observable<Action>;
  let productService: ProductServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    productService = new ProductServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ProductEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(ProductService, { useValue: productService });

    effects = TestBed.get(ProductEffects);
  });

  describe('given load banners', () => {

    beforeEach(() => {
      actions$ = of(loadProduct({id: '1'}));
    });

    it('should loadPkce return retrieveAuthCode', (done) => {
      const product = {id: 1} as any;
      productService.response = of(product);

      effects.loadProductEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadProductSuccess({product}));
        done();
      });
    });

    it('should retrieve auth code with success', (done) => {
      productService.response = throwError(error);

      effects.loadProductEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadProductFail({error}));
        done();
      });
    });

  });

});
