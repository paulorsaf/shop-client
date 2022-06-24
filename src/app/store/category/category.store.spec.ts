import { AppInitialState } from "../app-initial-state"
import { CategoryState } from "./category-state"
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess } from "./category.actions"
import { categoryReducer } from "./category.reducers"

describe('Trending store', () => {

    it('loadCategories', () => {
        const initialState: CategoryState = {
            ...AppInitialState.category,
            error: {error: "error"},
            isLoaded: true,
            isLoading: false,
            categories: <any> [{id: 1}],
        }

        const newState = categoryReducer(initialState, loadCategories());

        expect(newState).toEqual({
            ...AppInitialState.category,
            categories: [],
            error: null,
            isLoaded: false,
            isLoading: true
        })
    })

    it('loadCategoriesSuccess', () => {
        const initialState: CategoryState = {
            ...AppInitialState.category,
            isLoading: true
        }

        const categories = <any> [{id: 1}]
        const newState = categoryReducer(initialState, loadCategoriesSuccess({categories}));

        expect(newState).toEqual({
            ...AppInitialState.category,
            categories,
            isLoaded: true,
            isLoading: false
        })
    })

    it('loadCategoriesFail', () => {
        const initialState: CategoryState = {
            ...AppInitialState.category,
            isLoading: true
        }

        const error = {error: "error"};
        const newState = categoryReducer(initialState, loadCategoriesFail({error}));

        expect(newState).toEqual({
            ...AppInitialState.category,
            error,
            isLoaded: false,
            isLoading: false
        })
    })

})