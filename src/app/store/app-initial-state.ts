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
    company: {
        company: null,
        error: null,
        isLoaded: false,
        isLoading: false,
        isLoadedById: false,
        isLoadingById: false,
        selectedCompany: null
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
    purchaseDetail: {
        error: null,
        isLoaded: false,
        isLoading: false,
        purchase: undefined
    },
    purchases: {
        error: null,
        isLoaded: false,
        isLoading: false,
        purchases: []
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
        payment: null,
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
