import { User } from 'src/app/model/user/user'

export type UserState = {
    error: any;
    isLoggedInByToken: boolean;
    isLoggingInByToken: boolean;
    isLoggedOut: boolean;
    isLoggingOut: boolean;
    user: User;
}