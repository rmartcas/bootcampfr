import { Core } from '../../@core/common/model/core';

export class User extends Core<number> {
    username: string;
    name: string;
    email: string;
    profile: any;
}
