import { appInitialState } from "../app-initial-state";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducers";
import { LoginState } from "./login.state";

describe('Login store', () => {

    it('recoverPassword', () => {
        const initialState: LoginState = {
            ...appInitialState.login,
            error: {},
            isLoggedIn: true,
            isLoggingIn: true,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        }

        const newState = loginReducer(initialState, recoverPassword({email: "any"}));

        expect(newState).toEqual({
            ...appInitialState.login,
            error: undefined,
            isLoggedIn: false,
            isLoggingIn: false,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        })
    })

    it('recoverPasswordSuccess', () => {
        const initialState: LoginState = {
            ...appInitialState.login,
            isRecoveringPassword: true
        }

        const newState = loginReducer(initialState, recoverPasswordSuccess());

        expect(newState).toEqual({
            ...appInitialState.login,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        })
    })

    it('recoverPasswordFail', () => {
        const initialState: LoginState = {
            ...appInitialState.login,
            isRecoveringPassword: true
        }

        const error = {error: "error"};
        const newState = loginReducer(initialState, recoverPasswordFail({error}));

        expect(newState).toEqual({
            ...appInitialState.login,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        })
    })

    it('login', () => {
        const initialState: LoginState = {
            ...appInitialState.login,
            error: {},
            isLoggedIn: true,
            isLoggingIn: false,
            isRecoveredPassword: true,
            isRecoveringPassword: true
        }

        const newState = loginReducer(initialState, login({email: "any", password: "any"}));

        expect(newState).toEqual({
            ...appInitialState.login,
            error: undefined,
            isLoggedIn: false,
            isLoggingIn: true,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        })
    })

    it('loginSuccess', () => {
        const initialState: LoginState = {
            ...appInitialState.login,
            isLoggingIn: true
        }

        const newState = loginReducer(initialState, loginSuccess({user: {id: 1} as any}));

        expect(newState).toEqual({
            ...appInitialState.login,
            isLoggedIn: true,
            isLoggingIn: false
        })
    })

    it('loginFail', () => {
        const initialState: LoginState = {
            ...appInitialState.login,
            isLoggingIn: true
        }

        const error = {error: "error"};
        const newState = loginReducer(initialState, loginFail({error}));

        expect(newState).toEqual({
            ...appInitialState.login,
            error,
            isLoggedIn: false,
            isLoggingIn: false
        })
    })

})