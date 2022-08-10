import { BannerState } from './banner/banner.state';
import { CategoryState } from './category/category-state';
import { LoginState } from './login/login.state';
import { ProductState } from './product/product-state';
import { ProductsState } from './products/products.state';
import { RegisterState } from './register/register.state';
import { ShoppingCartState } from './shopping-cart/shopping-cart.state';
import { TrendingState } from './trending/trending-state';
import { UserState } from './user/user.state';

export type AppState = {
    banner: BannerState;
    category: CategoryState;
    login: LoginState;
    product: ProductState;
    products: ProductsState;
    register: RegisterState;
    shoppingCart: ShoppingCartState;
    trending: TrendingState;
    user: UserState;
};
