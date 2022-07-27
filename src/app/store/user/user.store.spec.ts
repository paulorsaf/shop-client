import { appInitialState } from "../app-initial-state"
import { setUser } from "./user.actions"
import { userReducer } from "./user.reducers"
import { UserState } from "./user.state"

describe('Trending store', () => {

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

})