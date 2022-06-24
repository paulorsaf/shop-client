import { AppState } from "./app-state";

export const AppInitialState: AppState = {
    banner: {
        banners: [],
        error: null,
        isLoaded: false,
        isLoading: false
    },
    trending: {
        error: null,
        isLoaded: false,
        isLoading: false,
        trendings: []
    }
}