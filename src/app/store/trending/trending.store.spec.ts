import { AppInitialState } from "../app-initial-state"
import { TrendingState } from "./trending-state"
import { loadTrendings, loadTrendingsFail, loadTrendingsSuccess } from "./trending.actions"
import { trendingReducer } from "./trending.reducers"

describe('Trending store', () => {

    it('loadTrendings', () => {
        const initialState: TrendingState = {
            ...AppInitialState.trending,
            error: {error: "error"},
            isLoaded: true,
            isLoading: false,
            trendings: <any> [{id: 1}],
        }

        const newState = trendingReducer(initialState, loadTrendings());

        expect(newState).toEqual({
            ...AppInitialState.trending,
            trendings: [],
            error: null,
            isLoaded: false,
            isLoading: true
        })
    })

    it('loadTrendingsSuccess', () => {
        const initialState: TrendingState = {
            ...AppInitialState.trending,
            isLoading: true
        }

        const trendings = <any> [{id: 1}]
        const newState = trendingReducer(initialState, loadTrendingsSuccess({trendings}));

        expect(newState).toEqual({
            ...AppInitialState.trending,
            trendings,
            isLoaded: true,
            isLoading: false
        })
    })

    it('loadTrendingsFail', () => {
        const initialState: TrendingState = {
            ...AppInitialState.trending,
            isLoading: true
        }

        const error = {error: "error"};
        const newState = trendingReducer(initialState, loadTrendingsFail({error}));

        expect(newState).toEqual({
            ...AppInitialState.trending,
            error,
            isLoaded: false,
            isLoading: false
        })
    })

})