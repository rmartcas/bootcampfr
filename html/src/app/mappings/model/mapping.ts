import { Core } from '../../@core/common/model/core';

export class Mapping extends Core<number> {
    pattern: string;
    position: number;
    authorities: any[] = [];
}
