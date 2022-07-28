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
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    },
    product: {
        error: null,
        isLoaded: false,
        isLoading: false,
        product: null
    },
    products: {
        error: null,
        isLoaded: false,
        isLoading: false,
        products: []
    },
    shoppingCart: {
        isOpen: false,
        products: []
    },
    trending: {
        error: null,
        isLoaded: false,
        isLoading: false,
        trendings: []
    },
    user: {
        error: null,
        isLoggedInByToken: false,
        isLoggingInByToken: false,
        isLoggedOut: false,
        isLoggingOut: false,
        user: null
    }
};
