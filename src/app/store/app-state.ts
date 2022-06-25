import { BannerState } from './banner/banner.state';
import { CategoryState } from './category/category-state';
import { ProductState } from './product/product-state';
import { ShoppingCartState } from './shopping-cart/shopping-cart.state';
import { TrendingState } from './trending/trending-state';

export type AppState = {
    banner: BannerState;
    category: CategoryState;
    product: ProductState;
    shoppingCart: ShoppingCartState;
    trending: TrendingState;
};
