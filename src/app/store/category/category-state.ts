import { Category } from 'src/app/model/category/category';

export type CategoryState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    categories: Category[];
};
