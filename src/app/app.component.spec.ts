import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BlankMockComponent } from './model/mocks/blank-mock/blank-mock.component';
import { ModalControllerMock } from './model/mocks/modal-controller.mock';
import { PageMock } from './model/mocks/page.mock';
import { AppState } from './store/app-state';
import { bannerReducer } from './store/banner/banner.reducers';
import { categoryReducer } from './store/category/category.reducers';
import { companyReducer } from './store/company/company.reducers';
import { loadOrganizationCompaniesSuccess } from './store/organization/organization.action';
import { organizationReducer } from './store/organization/organization.reducers';
import { trendingReducer } from './store/trending/trending.reducers';
import { loginUserByTokenFail, loginUserByTokenSuccess } from './store/user/user.actions';
import { userReducer } from './store/user/user.reducers';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let modalController: ModalControllerMock;
  let location: Location;

  beforeEach(waitForAsync(() => {
    modalController = new ModalControllerMock();

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "about-us", component: BlankMockComponent },
          { path: "contact-us", component: BlankMockComponent },
          { path: "credit-cards", component: BlankMockComponent },
          { path: "purchases", component: BlankMockComponent }
        ]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('banner', bannerReducer),
        StoreModule.forFeature('category', categoryReducer),
        StoreModule.forFeature('company', companyReducer),
        StoreModule.forFeature('organization', organizationReducer),
        StoreModule.forFeature('user', userReducer),
        StoreModule.forFeature('trending', trendingReducer),
      ],
    })
    .overrideProvider(ModalController, {useValue: modalController})
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  describe('given app starts', () => {

    it('then try to login user by token', done => {
      store.select('user').subscribe(state => {
        expect(state.isLoggingInByToken).toBeTruthy();
        done();
      })
    })

    it('then load organization companies', done => {
      store.select('organization').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    })

    it('then show contact us button', () => {
      expect(page.querySelector('[test-id="contact-us-menu"]')).not.toBeNull();
    })

    it('then show about us button', () => {
      expect(page.querySelector('[test-id="about-us-menu"]')).not.toBeNull();
    })

    it('when user clicks on contact us button, then go to my contact us page', done => {
      page.querySelector('[test-id="contact-us-menu"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/contact-us');
        done();
      }, 100)
    })

    describe('when logging in user by token', () => {

      it('then hide page', () => {
        expect(page.querySelector('[test-id="app"][hidden]')).not.toBeNull();
      })
  
      it('then show app loader', () => {
        expect(page.querySelector('[test-id="app-loader"]')).not.toBeNull();
      })

    })

    describe('when user logged in by token', () => {

      beforeEach(() => {
        const user = {id: 1} as any;
        store.dispatch(loginUserByTokenSuccess({user}));
        fixture.detectChanges();
      })

      it('then show page', () => {
        expect(page.querySelector('[test-id="app"]')).not.toBeNull();
      })
  
      it('then hide app loader', () => {
        expect(page.querySelector('[test-id="app-loader"][hidden]')).not.toBeNull();
      })

    })

    describe('when user not logged by token', () => {

      beforeEach(() => {
        store.dispatch(loginUserByTokenFail());
        fixture.detectChanges();
      })

      it('then show page', () => {
        expect(page.querySelector('[test-id="app"]')).not.toBeNull()
      })
  
      it('then hide app loader', () => {
        expect(page.querySelector('[test-id="app-loader"][hidden]')).not.toBeNull();
      })

    })
    
  })

  describe('given company loaded', () => {

    it('when company has logo, then show logo', () => {
      const companies = [{logo: {imageUrl: "anyImageUrl"}}] as any;
      store.dispatch(loadOrganizationCompaniesSuccess({companies}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="company-logo"]')).not.toBeNull();
    })

    it('when company doesnt have logo, then hide logo', () => {
      const companies = [{logo: {}}] as any;
      store.dispatch(loadOrganizationCompaniesSuccess({companies}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="company-logo"]')).toBeNull();
    })

  })

  describe('given user is not logged', () => {

    beforeEach(() => {
      store.dispatch(loginUserByTokenFail());
      fixture.detectChanges();
    })

    it('then show login button', () => {
      expect(page.querySelector('[test-id="login-menu"]')).not.toBeNull();
    })

    it('then hide logout button', () => {
      expect(page.querySelector('[test-id="logout-menu"]')).toBeNull();
    })

    it('then hide purchases button', () => {
      expect(page.querySelector('[test-id="purchases-menu"]')).toBeNull();
    })

    it('then hide credit cards button', () => {
      expect(page.querySelector('[test-id="credit-cards-menu"]')).toBeNull();
    })

    it('then hide change company button', () => {
      expect(page.querySelector('[test-id="change-company-menu"]')).toBeNull();
    })

    it('when user clicks on login button, then show login', done => {
      page.querySelector('[test-id="login-menu"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(modalController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

  })

  describe('given user is logged', () => {

    beforeEach(() => {
      const user = {id: 1} as any;
      store.dispatch(loginUserByTokenSuccess({user}));
      fixture.detectChanges();
    })

    it('then hide login button', () => {
      expect(page.querySelector('[test-id="login-menu"]')).toBeNull();
    })

    it('then show logout button', () => {
      expect(page.querySelector('[test-id="logout-menu"]')).not.toBeNull();
    })

    it('then show purchases button', () => {
      expect(page.querySelector('[test-id="purchases-menu"]')).not.toBeNull();
    })

    it('then show credit cards button', () => {
      expect(page.querySelector('[test-id="credit-cards-menu"]')).not.toBeNull();
    })

    it('when multi company, then show change company button', () => {
      const companies = [{id: 1}, {id: 2}] as any;
      store.dispatch(loadOrganizationCompaniesSuccess({companies}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="change-company-menu"]')).not.toBeNull();
    })

    it('when single company, then hide change company button', () => {
      const companies = [{id: 1}] as any;
      store.dispatch(loadOrganizationCompaniesSuccess({companies}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="change-company-menu"]')).toBeNull();
    })

    it('when user clicks on purchase button, then go to my purchases page', done => {
      page.querySelector('[test-id="purchases-menu"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/purchases');
        done();
      }, 100)
    })

    it('when user clicks on about us button, then go to my about us page', done => {
      page.querySelector('[test-id="about-us-menu"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/about-us');
        done();
      }, 100)
    })

    describe('when user clicks on logout button', () => {

      beforeEach(() => {
        page.querySelector('[test-id="logout-menu"]').click();
        fixture.detectChanges();
      })

      it('then logout', done => {
        store.select('user').subscribe(state => {
          expect(state.isLoggingOut).toBeTruthy();
          done();
        })
      })

    })

    it('when user clicks on credit cards button, then go to my credit cards page', done => {
      page.querySelector('[test-id="credit-cards-menu"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/credit-cards');
        done();
      }, 100)
    })

  })

  describe('given user clicks on change company', () => {

    beforeEach(() => {
      const companies = [{id: 1}, {id: 2}] as any;
      store.dispatch(loadOrganizationCompaniesSuccess({companies}));
      fixture.detectChanges();

      page.querySelector('[test-id="change-company-menu"]').click();
      fixture.detectChanges();
    })

    it('then show company modal', done => {
      setTimeout(() => {
        expect(modalController.isPresented).toBeTruthy();
        done();
      }, 100)
    })

    describe('when company selected', () => {

      it('then load banners', done => {
        setTimeout(() => {
          store.select('banner').subscribe(state => {
            expect(state.isLoading).toBeTruthy();
            done();
          })
        }, 100)
      })
  
      it('then load categories', done => {
        setTimeout(() => {
          store.select('category').subscribe(state => {
            expect(state.isLoading).toBeTruthy();
            done();
          })
        }, 100)
      })
  
      it('then load trendings', done => {
        setTimeout(() => {
          store.select('category').subscribe(state => {
            expect(state.isLoading).toBeTruthy();
            done();
          })
        }, 100)
      })

    })

  })

});