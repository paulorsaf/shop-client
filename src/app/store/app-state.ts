import { BannerState } from "./banner/banner.state";
import { CategoryState } from "./category/category-state";
import { TrendingState } from "./trending/trending-state";

export type AppState = {
    banner: BannerState;
    category: CategoryState;
    trending: TrendingState;
}