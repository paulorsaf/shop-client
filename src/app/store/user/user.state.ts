import { User } from 'src/app/model/user/user'

export type UserState = {
    error: any;
    isLoggedOut: boolean;
    isLoggingOut: boolean;
    user: User;
}