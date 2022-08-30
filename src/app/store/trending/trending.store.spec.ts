import { appInitialState } from "../app-initial-state"
import { TrendingState } from "./trending-state"
import { loadTrendingss, loadTrendingssFail, loadTrendingssSuccess } from "./trending.actions"
import { trendingReducer } from "./trending.reducers"

describe('Trending store', () => {

    it('loadTrendingss', () => {
        const initialState: TrendingState = {
            ...appInitialState.trending,
            error: {error: "error"},
            isLoaded: true,
            isLoading: false,
            trendings: <any> [{id: 1}],
        }

        const newState = trendingReducer(initialState, loadTrendingss());

        expect(newState).toEqual({
            ...appInitialState.trending,
            trendings: [],
            error: undefined,
            isLoaded: false,
            isLoading: true
        })
    })

    it('loadTrendingssSuccess', () => {
        const initialState: TrendingState = {
            ...appInitialState.trending,
            isLoading: true
        }

        const trendings = <any> [{id: 1}]
        const newState = trendingReducer(initialState, loadTrendingssSuccess({trendings}));

        expect(newState).toEqual({
            ...appInitialState.trending,
            trendings,
            isLoaded: true,
            isLoading: false
        })
    })

    it('loadTrendingssFail', () => {
        const initialState: TrendingState = {
            ...appInitialState.trending,
            isLoading: true
        }

        const error = {error: "error"};
        const newState = trendingReducer(initialState, loadTrendingssFail({error}));

        expect(newState).toEqual({
            ...appInitialState.trending,
            error,
            isLoaded: false,
            isLoading: false
        })
    })

})