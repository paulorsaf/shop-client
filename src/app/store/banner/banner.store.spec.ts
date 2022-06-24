import { AppInitialState } from "../app-initial-state"
import { loadBanners, loadBannersFail, loadBannersSuccess } from "./banner.actions"
import { bannerReducer } from "./banner.reducers"
import { BannerState } from "./banner.state"

describe('Banner store', () => {

    it('loadBanners', () => {
        const initialState: BannerState = {
            ...AppInitialState.banner,
            banners: <any> [{id: 1}],
            error: {error: "error"},
            isLoaded: true,
            isLoading: false
        }

        const newState = bannerReducer(initialState, loadBanners());

        expect(newState).toEqual({
            ...AppInitialState.banner,
            banners: [],
            error: null,
            isLoaded: false,
            isLoading: true
        })
    })

    it('loadBannersSuccess', () => {
        const initialState: BannerState = {
            ...AppInitialState.banner,
            isLoading: true
        }

        const banners = <any> [{id: 1}]
        const newState = bannerReducer(initialState, loadBannersSuccess({banners}));

        expect(newState).toEqual({
            ...AppInitialState.banner,
            banners,
            isLoaded: true,
            isLoading: false
        })
    })

    it('loadBannersFail', () => {
        const initialState: BannerState = {
            ...AppInitialState.banner,
            isLoading: true
        }

        const error = {error: "error"};
        const newState = bannerReducer(initialState, loadBannersFail({error}));

        expect(newState).toEqual({
            ...AppInitialState.banner,
            error,
            isLoaded: false,
            isLoading: false
        })
    })

})