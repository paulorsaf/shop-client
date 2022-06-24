import { appInitialState } from '../app-initial-state';
import { CategoryState } from './category-state';
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess } from './category.actions';
import { categoryReducer } from './category.reducers';

describe('Trending store', () => {

    it('loadCategories', () => {
        const initialState: CategoryState = {
            ...appInitialState.category,
            error: {error: 'error'},
            isLoaded: true,
            isLoading: false,
            categories: [{id: 1}] as any,
        };

        const newState = categoryReducer(initialState, loadCategories());

        expect(newState).toEqual({
            ...appInitialState.category,
            categories: [],
            error: null,
            isLoaded: false,
            isLoading: true
        });
    });

    it('loadCategoriesSuccess', () => {
        const initialState: CategoryState = {
            ...appInitialState.category,
            isLoading: true
        };

        const categories = [{id: 1}] as any;
        const newState = categoryReducer(initialState, loadCategoriesSuccess({categories}));

        expect(newState).toEqual({
            ...appInitialState.category,
            categories,
            isLoaded: true,
            isLoading: false
        });
    });

    it('loadCategoriesFail', () => {
        const initialState: CategoryState = {
            ...appInitialState.category,
            isLoading: true
        };

        const error = {error: 'error'};
        const newState = categoryReducer(initialState, loadCategoriesFail({error}));

        expect(newState).toEqual({
            ...appInitialState.category,
            error,
            isLoaded: false,
            isLoading: false
        });
    });

});
