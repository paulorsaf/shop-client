import { BannerState } from './banner/banner.state';
import { CategoryState } from './category/category-state';
import { ProductState } from './product/product-state';
import { ProductsState } from './products/products.state';
import { TrendingState } from './trending/trending-state';

export type AppState = {
    banner: BannerState;
    category: CategoryState;
    product: ProductState;
    products: ProductsState;
    trending: TrendingState;
};
