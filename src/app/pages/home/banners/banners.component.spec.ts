import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadBannersSuccess } from 'src/app/store/banner/banner.actions';
import { bannerReducer } from 'src/app/store/banner/banner.reducers';
import { BannersComponent } from './banners.component';

describe('BannersComponent', () => {
  let component: BannersComponent;
  let fixture: ComponentFixture<BannersComponent>;
  let store: Store<AppState>;
  let page: PageMock;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BannersComponent],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('banner', bannerReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BannersComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    const banners = <any> [{id: 1}, {id: 2}];
    store.dispatch(loadBannersSuccess({banners}));
    fixture.detectChanges();
  }));

  it('given banners, then show banners list', () => {
    expect(page.querySelectorAll('[test-id="banner"]').length).toEqual(2);
  })

});
