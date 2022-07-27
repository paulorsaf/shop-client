import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { CategoryEffects } from './category.effects';
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess } from './category.actions';
import { CategoryServiceMock } from 'src/app/model/mocks/category.service.mock';
import { CategoryService } from 'src/app/services/category/category.service';

describe('Category effects', () => {
  let effects: CategoryEffects;
  let actions$: Observable<Action>;
  let categoryService: CategoryServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    categoryService = new CategoryServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([CategoryEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(CategoryService, { useValue: categoryService });

    effects = TestBed.get(CategoryEffects);
  });

  describe('given load categories', () => {

    beforeEach(() => {
      actions$ = of(loadCategories());
    })

    it('when success, then return load categories success', (done) => {
      const categories = <any> [{id: 1}];
      categoryService.response = of(categories);

      effects.loadCategoriesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCategoriesSuccess({categories}));
        done();
      });
    });
  
    it('when fail, then return load categories fail', (done) => {
      categoryService.response = throwError(error);

      effects.loadCategoriesEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadCategoriesFail({error}));
        done();
      });
    });

  })

});
