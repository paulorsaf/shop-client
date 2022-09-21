import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadCompanySuccess } from 'src/app/store/company/company.action';
import { companyReducer } from 'src/app/store/company/company.reducers';
import { ContactUsPage } from './contact-us.page';

fdescribe('ContactUsPage', () => {
  let component: ContactUsPage;
  let fixture: ComponentFixture<ContactUsPage>;
  let store: Store<AppState>;
  let page: PageMock;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsPage ],
      imports: [
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('company', companyReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    spyOn(window, 'open');

    store.dispatch(loadCompanySuccess({company: {} as any}));
    fixture.detectChanges();
  }));

  it('given company doesnt have facebook, then hide facebook item', () => {
    expect(page.querySelector('[test-id="facebook"]')).toBeNull();
  })

  it('given company doesnt have instagram, then hide instagram item', () => {
    expect(page.querySelector('[test-id="instagram"]')).toBeNull();
  })

  it('given company doesnt have website, then hide website item', () => {
    expect(page.querySelector('[test-id="website"]')).toBeNull();
  })

  it('given company doesnt have whatsapp, then hide whatsapp item', () => {
    expect(page.querySelector('[test-id="whatsapp"]')).toBeNull();
  })

  describe('given company has facebook', () => {

    beforeEach(() => {
      store.dispatch(loadCompanySuccess({company: {facebook: "anyFacebookLink"} as any}));
      fixture.detectChanges();
    })

    it('then show facebook item', () => {
      expect(page.querySelector('[test-id="facebook"]')).not.toBeNull();
    })

    it('when user clicks on facebook item, then open facebook page', () => {
      page.querySelector('[test-id="facebook"]').click();
      fixture.detectChanges();

      expect(window.open).toHaveBeenCalled();
    })

  })

  describe('given company has instagram', () => {

    beforeEach(() => {
      store.dispatch(loadCompanySuccess({company: {instagram: "anyInstagramLink"} as any}));
      fixture.detectChanges();
    })

    it('then show instagram item', () => {
      expect(page.querySelector('[test-id="instagram"]')).not.toBeNull();
    })

    it('when user clicks on instagram item, then open instagram page', () => {
      page.querySelector('[test-id="instagram"]').click();
      fixture.detectChanges();

      expect(window.open).toHaveBeenCalled();
    })

  })

  describe('given company has website', () => {

    beforeEach(() => {
      store.dispatch(loadCompanySuccess({company: {website: "anyWebsiteLink"} as any}));
      fixture.detectChanges();
    })

    it('then show website item', () => {
      expect(page.querySelector('[test-id="website"]')).not.toBeNull();
    })

    it('when user clicks on website item, then open website page', () => {
      page.querySelector('[test-id="website"]').click();
      fixture.detectChanges();

      expect(window.open).toHaveBeenCalled();
    })

  })

  describe('given company has whatsapp', () => {

    beforeEach(() => {
      store.dispatch(loadCompanySuccess({company: {whatsapp: "anyWhatsappLink"} as any}));
      fixture.detectChanges();
    })

    it('then show whatsapp item', () => {
      expect(page.querySelector('[test-id="whatsapp"]')).not.toBeNull();
    })

    it('when user clicks on whatsapp item, then open whatsapp page', () => {
      page.querySelector('[test-id="whatsapp"]').click();
      fixture.detectChanges();

      expect(window.open).toHaveBeenCalled();
    })

  })

});