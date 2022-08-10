import { appInitialState } from '../app-initial-state';
import { register, registerFail, registerSuccess } from './register.actions';
import { registerReducer } from './register.reducers';
import { RegisterState } from './register.state';

describe('Register store', () => {

    it('register', () => {
        const initialState: RegisterState = {
            ...appInitialState.register,
            error: {},
            isRegistered: true,
            isRegistering: false
        };

        const userRegister = {id: 1} as any;
        const newState = registerReducer(initialState, register({userRegister}));

        expect(newState).toEqual({
            ...appInitialState.register,
            error: null,
            isRegistered: false,
            isRegistering: true
        });
    });

    it('registerSuccess', () => {
        const initialState: RegisterState = {
            ...appInitialState.register,
            isRegistering: true
        };

        const userRegister = {id: 1} as any;
        const newState = registerReducer(initialState, registerSuccess({userRegister}));

        expect(newState).toEqual({
            ...appInitialState.register,
            isRegistered: true,
            isRegistering: false
        });
    });

    it('registerFail', () => {
        const initialState: RegisterState = {
            ...appInitialState.register,
            isRegistering: true
        };

        const error = {id: 1} as any;
        const newState = registerReducer(initialState, registerFail({error}));

        expect(newState).toEqual({
            ...appInitialState.register,
            error,
            isRegistered: false,
            isRegistering: false
        });
    });

});
