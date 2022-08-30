import { BannerState } from './banner/banner.state';
import { CategoryState } from './category/category-state';
import { CompanyState } from './company/company.state';
import { LoginState } from './login/login.state';
import { ProductState } from './product/product.state';
import { ProductsState } from './products/products.state';
import { PurchaseDetailState } from './purchase-detail/purchase-detail.state';
import { PurchasesState } from './purchases/purchases.state';
import { RegisterState } from './register/register.state';
import { ShoppingCartState } from './shopping-cart/shopping-cart.state';
import { TrendingState } from './trending/trending-state';
import { UserState } from './user/user.state';

export type AppState = {
    banner: BannerState;
    category: CategoryState;
    company: CompanyState;
    login: LoginState;
    product: ProductState;
    products: ProductsState;
    purchaseDetail: PurchaseDetailState;
    purchases: PurchasesState;
    register: RegisterState;
    shoppingCart: ShoppingCartState;
    trending: TrendingState;
    user: UserState;
};
