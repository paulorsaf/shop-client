import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { BannerEffects } from './banner.effects';
import { BannersService } from 'src/app/services/banners/banners.service';
import { loadBanners, loadBannersFail, loadBannersSuccess } from './banner.actions';
import { BannersServiceMock } from 'src/app/model/mocks/banners.service.mock';

describe('Banners effects', () => {
  let effects: BannerEffects;
  let actions$: Observable<Action>;
  let bannerService: BannersServiceMock;

  const error = { error: 'error' };

  beforeEach(() => {
    bannerService = new BannersServiceMock();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BannerEffects]),
      ],
      providers: [provideMockActions(() => actions$)],
    })
    .overrideProvider(BannersService, { useValue: bannerService });

    effects = TestBed.get(BannerEffects);
  });

  describe('given load banners', () => {

    beforeEach(() => {
      actions$ = of(loadBanners());
    })

    it('should loadPkce return retrieveAuthCode', (done) => {
      const banners = <any> [{id: 1}];
      bannerService._response = of(banners);

      effects.loadBannersEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadBannersSuccess({banners}));
        done();
      });
    });
  
    it('should retrieve auth code with success', (done) => {
      const error = {error: "error"};
      bannerService._response = throwError(error);

      effects.loadBannersEffect$.subscribe((newAction) => {
        expect(newAction).toEqual(loadBannersFail({error}));
        done();
      });
    });

  })

});
