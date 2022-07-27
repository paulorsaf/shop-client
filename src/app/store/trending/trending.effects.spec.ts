import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { TrendingEffects } from './trending.effects';
import { loadTrendingss, loadTrendingssFail, loadTrendingssSuccess } from './trending.actions';
import { TrendingsServiceMock } from 'src/app/model/mocks/trendings.service.mock';
import { TrendingService } from 'src/app/services/trending/trending.service';

describe('Trendings effects', () => {
  let effects: TrendingEffects;
  let actions$: Observable<Action>;
  let trendingsService: TrendingsServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    trendingsService = new TrendingsServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([TrendingEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(TrendingService, { useValue: trendingsService });

    effects = TestBed.get(TrendingEffects);
  });

  describe('given load banners', () => {

    beforeEach(() => {
      actions$ = of(loadTrendingss());
    })

    it('should loadPkce return retrieveAuthCode', (done) => {
      const trendings = <any> [{id: 1}];
      trendingsService.response = of(trendings);

      effects.loadTrendingssEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadTrendingssSuccess({trendings}));
        done();
      });
    });
  
    it('should retrieve auth code with success', (done) => {
      trendingsService.response = throwError(error);

      effects.loadTrendingssEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadTrendingssFail({error}));
        done();
      });
    });

  })

});
