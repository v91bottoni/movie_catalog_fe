import { user } from "./user";

export interface userres{
    user: user;
    msg: string;
    token: string;
    refreshToken: string;
}
