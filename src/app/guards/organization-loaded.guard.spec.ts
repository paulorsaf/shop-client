import { TestBed, waitForAsync } from "@angular/core/testing";
import { ModalController } from "@ionic/angular";
import { Store, StoreModule } from "@ngrx/store";
import { ModalControllerMock } from "../model/mocks/modal-controller.mock";
import { AppState } from "../store/app-state";
import { loadOrganizationCompaniesSuccess, setSelectedCompany } from "../store/organization/organization.action";
import { organizationReducer } from "../store/organization/organization.reducers";
import { OrganizationLoadedGuard } from "./organization-loaded.guard"

describe('Organization loaded guard', () => {

    let guard: OrganizationLoadedGuard;
    let modalController: ModalControllerMock;
    let store: Store<AppState>;

    beforeEach(waitForAsync(() => {
        modalController = new ModalControllerMock();

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                StoreModule.forFeature('organization', organizationReducer)
            ]
        })
        .overrideProvider(ModalController, {useValue: modalController})
        .compileComponents();
    
        guard = TestBed.inject(OrganizationLoadedGuard);
        store = TestBed.inject(Store);
    }));

    describe('given organization loaded', () => {

        it('when only one company exists, then return true', done => {
            store.dispatch(loadOrganizationCompaniesSuccess({companies: [{id: 1}] as any}));
    
            guard.canActivate().subscribe(canActivate => {
                expect(canActivate).toBeTruthy();
                done();
            })
        })

        describe('when more than one company exists', () => {

            const companies = [{id: 1}, {id: 2}] as any;
            
            beforeEach(() => {
                store.dispatch(loadOrganizationCompaniesSuccess({companies}));
            })
    
            it('and no company is selected, then open select company modal', done => {
                guard.canActivate().subscribe(() => {
                    expect(modalController.isPresented).toBeTruthy();
                    done();
                })
            })
        
            it('and company is selected, then return true', done => {
                store.dispatch(setSelectedCompany({company: {id: 1} as any}));

                guard.canActivate().subscribe(canActivate => {
                    expect(canActivate).toBeTruthy();
                    done();
                })
            })

        })

    })

})