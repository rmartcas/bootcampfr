import { Core } from '../../@core/common/model/core';

export class Audit extends Core<number> {
    data: [{ [name: string]: any }];
    table: string;
    action: string;
    step: string;
    pairKey: string;
    requestId: string;
    created: Date;
    user: string;
}
