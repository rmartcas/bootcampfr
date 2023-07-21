import { Core } from '../../@core/common/model/core';

export class Menu extends Core<number> {
    title: string;
    link: string;
    icon: string;
    position: number;
    authorities: any[] = [];
    enabled: boolean;
    parent: Menu;
}
