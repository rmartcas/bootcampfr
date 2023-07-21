import { Menu } from '../../layout/layout-menu/model/menu';
import { User } from './user';

export class Config {
    locale: string;
    defaultLocale: string;
    locales: string[];
    user: User;
    api: { [name: string]: any };
    menus: Menu[];
    recaptcha: {
        siteKey: string;
        headerName: string;
    };
    pagination: {
        page: number;
        size: number;
        pageLimits: number[];
    };
}
