import { appInitialState } from '../app-initial-state';
import { AppState } from '../app-state';
import { clearProduct, loadProduct, loadProductFail, loadProductSuccess, setSelectedColor, setSelectedSize } from './product.actions';
import { productReducer } from './product.reducers';
import { ProductState, selectColors, selectStockOptionSelected } from './product.state';

describe('Product store', () => {

    describe("selectStockOptionSelected", () => {

        let state: AppState;

        beforeEach(() => {
            state = {
                product: {
                    product: {
                        stock: [
                            { color: "color1", size: "M" },
                            { color: "color2", size: "P" },
                            { color: "color3", size: "M" }
                        ]
                    },
                    selectedColor: "color3",
                    selectedSize: "M"
                }
            } as any;
        })

        describe('given stock has sizes and colors', () => {

            it('when both selected, then return stock', () => {
                expect(selectStockOptionSelected(state)).toEqual(
                    state.product.product.stock[2]
                )
            })
    
            it('when no size selected, then return null', () => {
                state.product.selectedSize = null;
    
                expect(selectStockOptionSelected(state)).toBeUndefined();
            })
    
            it('when no color selected, then return null', () => {
                state.product.selectedColor = null;
    
                expect(selectStockOptionSelected(state)).toBeUndefined();
            })

        })

        it('given stock has only sizes, when size is selected, then return stock', () => {
            state.product.selectedColor = undefined;
            state.product.selectedSize = "P";
            state.product.product.stock = [{ size: "M" }, { size: "P" }, { size: "M" }] as any

            expect(selectStockOptionSelected(state)).toEqual(
                state.product.product.stock[1]
            )
        })

        it('given stock has only colors, when color is selected, then return stock', () => {
            state.product.selectedColor = "color2";
            state.product.selectedSize = undefined;
            state.product.product.stock = [
                { color: "color1" }, { color: "color2" }, { color: "color3" }
            ] as any;

            expect(selectStockOptionSelected(state)).toEqual(
                state.product.product.stock[1]
            )
        })

        it('given stock doesnt have sizes and colors, then return first on stock', () => {
            state.product.product.stock = [{ id: "anyStockId" }] as any;

            expect(selectStockOptionSelected(state)).toEqual(
                state.product.product.stock[0]
            )
        })

    })

    describe("selectColors", () => {

        let state: AppState;

        beforeEach(() => {
            state = {
                product: {
                    product: {
                        stock: [
                            { color: "color1", size: "M" },
                            { color: "color2", size: "P" },
                            { color: "color3", size: "M" }
                        ]
                    },
                    selectedSize: "M"
                }
            } as any;
        })

        it('given stock doesnt have sizes, then return all colors', () => {
            state.product.product.stock[0].size = null;
            state.product.product.stock[1].size = null;
            state.product.product.stock[2].size = null;

            expect(selectColors(state)).toEqual(["color1", "color2", "color3"]);
        })

        it('given size is not selected, then return empty', () => {
            state.product.selectedSize = "";

            expect(selectColors(state)).toEqual([]);
        })

        it('given size is selected, when there are no colors for that size, then return empty', () => {
            state.product.selectedSize = "G";

            expect(selectColors(state)).toEqual([]);
        })

        it('given size is selected, when product has colors for that size, then return colors', () => {
            expect(selectColors(state)).toEqual(["color1", "color3"]);
        })

    })

    it('loadProduct', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            error: {error: 'error'},
            isLoaded: true,
            isLoading: false,
            product: {id: 1} as any,
        };

        const newState = productReducer(initialState, loadProduct({id: '1'}));

        expect(newState).toEqual({
            ...appInitialState.product,
            product: undefined,
            error: undefined,
            isLoaded: false,
            isLoading: true
        });
    });

    it('loadProductSuccess', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            isLoading: true
        };

        const product = {id: 1} as any;
        const newState = productReducer(initialState, loadProductSuccess({product}));

        expect(newState).toEqual({
            ...appInitialState.product,
            product,
            isLoaded: true,
            isLoading: false
        });
    });

    it('loadProductFail', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            isLoading: true
        };

        const error = {error: 'error'};
        const newState = productReducer(initialState, loadProductFail({error}));

        expect(newState).toEqual({
            ...appInitialState.product,
            error,
            isLoaded: false,
            isLoading: false
        });
    });

    it('setSelectedSize', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            selectedColor: "anyColor",
            selectedSize: undefined
        };

        const newState = productReducer(initialState, setSelectedSize({size: 'anySize'}));

        expect(newState).toEqual({
            ...appInitialState.product,
            selectedColor: undefined,
            selectedSize: "anySize"
        });
    });

    it('setSelectedColor', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            selectedColor: undefined
        };

        const newState = productReducer(initialState, setSelectedColor({color: 'anyColor'}));

        expect(newState).toEqual({
            ...appInitialState.product,
            selectedColor: "anyColor"
        });
    });

    it('clearProduct', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            error: {},
            isLoaded: true,
            isLoading: true,
            product: {} as any,
            selectedColor: "any",
            selectedSize: "any"
        };

        const newState = productReducer(initialState, clearProduct());

        expect(newState).toEqual({
            ...appInitialState.product
        });
    });

});
