import { Core } from '../../../common/model/core';

export interface Menu extends Core<number> {
    parent: Menu;
    title: string;
    link: string;
    icon: string;
    roles: string[];
    enabled: boolean;
    children: Menu[];
}
