import { appInitialState } from "../app-initial-state"
import { loginUserByToken, loginUserByTokenFail, loginUserByTokenSuccess, logout, logoutFail, logoutSuccess, setUser } from "./user.actions"
import { userReducer } from "./user.reducers"
import { UserState } from "./user.state"

describe('User store', () => {

    it('setUser', () => {
        const initialState: UserState = {
            ...appInitialState.user,
        }

        const user = {id: 1} as any;
        const newState = userReducer(initialState, setUser({user}));

        expect(newState).toEqual({
            ...appInitialState.user,
            user
        })
    })

    it('logout', () => {
        const initialState: UserState = {
            ...appInitialState.user,
            isLoggedOut: true,
            isLoggingOut: false
        }

        const newState = userReducer(initialState, logout());

        expect(newState).toEqual({
            ...appInitialState.user,
            isLoggedOut: false,
            isLoggingOut: true
        })
    })

    it('logoutSuccess', () => {
        const initialState: UserState = {
            ...appInitialState.user,
            isLoggedOut: true,
            isLoggingOut: false
        }

        const newState = userReducer(initialState, logoutSuccess());

        expect(newState).toEqual({
            ...appInitialState.user,
            isLoggedOut: true,
            isLoggingOut: false
        })
    })

    it('logoutFail', () => {
        const initialState: UserState = {
            ...appInitialState.user,
            isLoggedOut: true,
            isLoggingOut: false
        }

        const error = {error: "error"};
        const newState = userReducer(initialState, logoutFail({error}));

        expect(newState).toEqual({
            ...appInitialState.user,
            error,
            isLoggedOut: false,
            isLoggingOut: false
        })
    })

    it('loginUserByToken', () => {
        const initialState: UserState = {
            ...appInitialState.user,
            user: {id: 1} as any,
            isLoggedInByToken: true,
            isLoggingInByToken: false
        }

        const newState = userReducer(initialState, loginUserByToken());

        expect(newState).toEqual({
            ...appInitialState.user,
            user: undefined,
            isLoggedInByToken: false,
            isLoggingInByToken: true
        })
    })

    it('loginUserByTokenSuccess', () => {
        const initialState: UserState = {
            ...appInitialState.user,
            isLoggingInByToken: true
        }

        const user = {id: 1} as any;
        const newState = userReducer(initialState, loginUserByTokenSuccess({user}));

        expect(newState).toEqual({
            ...appInitialState.user,
            user,
            isLoggedInByToken: true,
            isLoggingInByToken: false
        })
    })

    it('loginUserByTokenFail', () => {
        const initialState: UserState = {
            ...appInitialState.user,
            user: {id: 1} as any,
            isLoggingInByToken: true
        }

        const newState = userReducer(initialState, loginUserByTokenFail());

        expect(newState).toEqual({
            ...appInitialState.user,
            user: undefined,
            isLoggedInByToken: true,
            isLoggingInByToken: false
        })
    })

})