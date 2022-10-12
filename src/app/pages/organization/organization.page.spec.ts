import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { ModalControllerMock } from 'src/app/model/mocks/modal-controller.mock';
import { PageMock } from 'src/app/model/mocks/page.mock';
import { AppState } from 'src/app/store/app-state';
import { loadOrganizationCompanies, loadOrganizationCompaniesSuccess } from 'src/app/store/organization/organization.action';
import { organizationReducer } from 'src/app/store/organization/organization.reducers';
import { OrganizationPage } from './organization.page';

describe('OrganizationPage', () => {
  let component: OrganizationPage;
  let fixture: ComponentFixture<OrganizationPage>;
  let store: Store<AppState>;
  let page: PageMock;
  let modalController: ModalControllerMock;

  beforeEach(waitForAsync(() => {
    modalController = new ModalControllerMock();

    TestBed.configureTestingModule({
      declarations: [ OrganizationPage ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature('organization', organizationReducer)
      ]
    })
    .overrideProvider(ModalController, {useValue: modalController})
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    store.dispatch(loadOrganizationCompanies());

    fixture.detectChanges();
  }));

  describe('given loading organization', () => {

    it('then show organization loader', () => {
      expect(page.querySelector('[test-id="organization-loader"]')).not.toBeNull();
    })

    it('then hide organization', () => {
      expect(page.querySelector('[test-id="organization"]')).toBeNull();
    })

  })

  describe('given organization loaded', () => {

    const company = {id: 1} as any;

    beforeEach(() => {
      const companies = [company, {id: 2} as any];
      store.dispatch(loadOrganizationCompaniesSuccess({companies}));
      fixture.detectChanges();
    })

    it('then hide organization loader', () => {
      expect(page.querySelector('[test-id="organization-loader"]')).toBeNull();
    })

    it('then show organization', () => {
      expect(page.querySelector('[test-id="organization"]')).not.toBeNull();
    })

    describe('when user clicks on organization', () => {

      beforeEach(() => {
        page.querySelectorAll('[test-id="company"]')[0].click();
        fixture.detectChanges();
      })

      it('then set company as selected', done => {
        store.select('organization').subscribe(state => {
          expect(state.selectedCompany).toEqual(company);
          done();
        })
      })

      it('then close organization page', () => {
        expect(modalController.isDismissed).toBeTruthy();
      })

    })

  })

});