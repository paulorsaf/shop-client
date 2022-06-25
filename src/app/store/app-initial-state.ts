import { AppState } from './app-state';

export const appInitialState: AppState = {
    banner: {
        banners: [],
        error: null,
        isLoaded: false,
        isLoading: false
    },
    category: {
        categories: [],
        error: null,
        isLoaded: false,
        isLoading: false
    },
    product: {
        error: null,
        isLoaded: false,
        isLoading: false,
        product: null
    },
    shoppingCart: {
        products: []
    },
    trending: {
        error: null,
        isLoaded: false,
        isLoading: false,
        trendings: []
    }
};
