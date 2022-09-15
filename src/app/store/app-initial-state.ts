import { AppState } from './app-state';

export const appInitialState: AppState = {
    address: {
        address: undefined,
        deliveryPrice: undefined,
        error: undefined,
        isGettingDeliveryPrice: false,
        isGotDeliveryPrice: false,
        isLoaded: false,
        isLoading: false
    },
    banner: {
        banners: [],
        error: undefined,
        isLoaded: false,
        isLoading: false
    },
    category: {
        categories: [],
        error: undefined,
        isLoaded: false,
        isLoading: false
    },
    company: {
        company: undefined,
        error: undefined,
        isLoaded: false,
        isLoading: false,
        isLoadedById: false,
        isLoadingById: false,
        selectedCompany: undefined
    },
    creditCards: {
        creditCards: [],
        error: undefined,
        isDeleted: false,
        isDeleting: false,
        isLoaded: false,
        isLoading: false
    },
    login: {
        error: undefined,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    },
    product: {
        error: undefined,
        isLoaded: false,
        isLoading: false,
        product: undefined,
        selectedColor: undefined,
        selectedSize: undefined
    },
    products: {
        error: undefined,
        isLoaded: false,
        isLoading: false,
        products: []
    },
    purchaseDetail: {
        error: undefined,
        isLoaded: false,
        isLoading: false,
        purchase: undefined
    },
    purchases: {
        error: undefined,
        isLoaded: false,
        isLoading: false,
        isLoadedPaymentPurchase: false,
        isLoadingPaymentPurchase: false,
        paymentPurchase: undefined,
        purchases: []
    },
    register: {
        error: undefined,
        isRegistered: false,
        isRegistering: false
    },
    shoppingCart: {
        deliveryAddress: undefined,
        deliveryPrice: undefined,
        error: undefined,
        isCalculatedPrice: false,
        isCalculatingPrice: false,
        isOpen: false,
        isPaid: false,
        isPaying: false,
        payment: undefined,
        price: undefined,
        products: []
    },
    trending: {
        error: undefined,
        isLoaded: false,
        isLoading: false,
        trendings: []
    },
    user: {
        error: undefined,
        isLoggedInByToken: false,
        isLoggingInByToken: false,
        isLoggedOut: false,
        isLoggingOut: false,
        user: undefined
    }
};
