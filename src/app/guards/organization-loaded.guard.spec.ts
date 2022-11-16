import { TestBed, waitForAsync } from "@angular/core/testing";
import { ModalController } from "@ionic/angular";
import { Store, StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ModalControllerMock } from "../model/mocks/modal-controller.mock";
import { StorageService } from "../services/storage/storage.service";
import { AppState } from "../store/app-state";
import { loadOrganizationCompaniesSuccess, setSelectedCompany } from "../store/organization/organization.action";
import { organizationReducer } from "../store/organization/organization.reducers";
import { OrganizationLoadedGuard } from "./organization-loaded.guard"

describe('Organization loaded guard', () => {

    let guard: OrganizationLoadedGuard;
    let modalController: ModalControllerMock;
    let store: Store<AppState>;
    let storageService: StorageServiceMock;

    beforeEach(waitForAsync(() => {
        modalController = new ModalControllerMock();
        storageService = new StorageServiceMock();

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                StoreModule.forFeature('organization', organizationReducer)
            ]
        })
        .overrideProvider(ModalController, {useValue: modalController})
        .overrideProvider(StorageService, {useValue: storageService})
        .compileComponents();
    
        guard = TestBed.inject(OrganizationLoadedGuard);
        store = TestBed.inject(Store);
    }));

    it('given only one company in organization, then return true', done => {
        store.dispatch(loadOrganizationCompaniesSuccess({companies: [{id: 1}] as any}));

        guard.canActivate().subscribe(canActivate => {
            expect(canActivate).toBeTruthy();
            done();
        })
    })

    describe('when multiple companies in organization', () => {

        const companies = [{id: "anyId1"}, {id: "anyId2"}] as any;
        
        beforeEach(() => {
            store.dispatch(loadOrganizationCompaniesSuccess({companies}));
        })

        it('when selected company is not stored, then open select company modal', done => {
            guard.canActivate().subscribe(() => {
                expect(modalController.isPresented).toBeTruthy();
                done();
            })
        })

        describe('when selected company is stored', () => {

            beforeEach(() => {
                storageService._getResponse = of("anyId2");
            })

            it('then set company as selected', done => {
                guard.canActivate().subscribe(() => {
                    store.select('organization').subscribe(state => {
                        expect(state.selectedCompany).toEqual({id: "anyId2"} as any);
                        done();
                    })
                })
            })

            it('then return true', done => {
                guard.canActivate().subscribe(canActivate => {
                    expect(canActivate).toBeTruthy();
                    done();
                })
            })

        })
    
        it('when user selected a company, then return true', done => {
            store.dispatch(setSelectedCompany({company: {id: "anyId1"} as any}));

            guard.canActivate().subscribe(canActivate => {
                expect(canActivate).toBeTruthy();
                done();
            })
        })

    })

})

class StorageServiceMock {
    _getResponse = of(null);
    getItem() {
        return this._getResponse;
    }
}