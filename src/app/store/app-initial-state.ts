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
    register: {
        error: null,
        isRegistered: false,
        isRegistering: false
    },
    shoppingCart: {
        deliveryAddress: null,
        error: null,
        isOpen: false,
        isPaid: false,
        isPaying: false,
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
