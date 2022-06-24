import { BannerState } from "./banner/banner.state";
import { TrendingState } from "./trending/trending-state";

export type AppState = {
    banner: BannerState;
    trending: TrendingState;
}