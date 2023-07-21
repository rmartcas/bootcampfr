import { Core } from '../../@core/common/model/core';

export class Profile extends Core<number> {
    name: string;
    description: string;
    default: boolean;
    authorities: any[] = [];
}
