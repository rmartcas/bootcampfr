import { Core } from '../../@core/common/model/core';

export class Authority extends Core<number> {
    name: string;
    description: string;
    profiles: any[] = [];
}
