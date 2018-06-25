import { User } from './user';

export class UserImpl implements User {

    _id: string;
    username: string;
    email: string;
    password: string;
    roles: string[];

    auth = false;
    token: string;
}
