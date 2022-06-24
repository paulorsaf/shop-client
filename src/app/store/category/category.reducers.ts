import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../app-initial-state';
import { CategoryState } from './category-state';
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess } from './category.actions';

const initialState: CategoryState = AppInitialState.category;

const _categoryReducer = createReducer(
  initialState,
  on(loadCategories, (state) => {
    return {
      ...state,
      error: null,
      isLoaded: false,
      isLoading: true,
      categories: []
    };
  }),
  on(loadCategoriesSuccess, (state, action) => {
    return {
      ...state,
      isLoaded: true,
      isLoading: false,
      categories: action.categories
    };
  }),
  on(loadCategoriesFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoaded: false,
      isLoading: false
    };
  })
);

export function categoryReducer(state: CategoryState, action: any): CategoryState {
  return _categoryReducer(state, action);
}
