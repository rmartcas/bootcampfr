import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Menu } from '../model/menu';
import { AppConfigService } from '../../../modules/app-config/app-config.service';
import { tap } from 'rxjs/operators';
import { Route, Router, Routes } from '@angular/router';
import { MenuFolderComponent } from '../component/menu-folder/menu-folder.component';
import { RoleGuardService } from '../../../modules/security/role-guard.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnDestroy {

  private readonly menuFolderPlaceHolder: Route = {
    path: '', component: MenuFolderComponent,
    data: { roles: [], isMenuFolder: true},
    canLoad: [RoleGuardService],
    canActivate: [RoleGuardService]
  };

  private subscription: Subscription;
  private readonly cache$: Observable<Menu[]>;
  private readonly menuSubject: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  constructor(private readonly http: HttpClient, private readonly appConfig: AppConfigService, private readonly router: Router) {
    this.cache$ = this.menuSubject.asObservable();
  }

  getMenus(refresh = false): Observable<Menu[]> {
    if (!this.cache$ || refresh) {
      this.load();
    }

    return this.cache$.pipe(tap(
      menus => {
        const organizedRoutes = [];
        // Buscamos la ruta donde organizar todas las de la aplicación
        const route = this.router.config.find(r => r.data?.appRoutes === true);
        this.organizeRoutes(menus, route?.children, organizedRoutes, '');
        if (organizedRoutes.length > 0) {
          this.finalizeOrganizedRoutes(menus, organizedRoutes, route);
        }
      }
    ));
  }

  async load() {
    if (undefined === this.subscription) {
      this.subscription = this.appConfig.cache$.subscribe(c => {
        this.menuSubject.next(c.menus);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private finalizeOrganizedRoutes(menus: Menu[], organizedRoutes: any[], route: Route) {
    this.checkMenuRoutes(menus, organizedRoutes);
    organizedRoutes.forEach(or => {
      const parent = this.findRouteById(organizedRoutes, or.data?.parent);

      if (parent) {
        if (parent.children?.length === 0) {
          // Cuando se genere un array de hijos, el primer elemento deberá ser un MenuFolderComponent
          parent.children.push(this.menuFolderPlaceHolder);
        }
        if (!this.isIncluded(parent.children, or)) {
          parent.children.push(or);
        }
      }
    });
    const filteredRoutes = organizedRoutes.filter(r => r.data?.parent === undefined);
    route.children = filteredRoutes;
    this.router.resetConfig(this.router.config);
  }

  private checkMenuRoutes(menus: Menu[], organizedRoutes: Routes): void {
    menus.forEach(m => {
      //Buscar la ruta asociada al menú, si no existe se crea y se añade a organizedRoutes
      let menuRoute = this.findRouteById(organizedRoutes, m.id);

      if (undefined === menuRoute) {
        menuRoute = {
          path: m.link.substring(m.link.lastIndexOf('/') + 1),
          data: { breadcrumb: m.title, roles: m.roles, id: m.id, parent: m.parent?.id },
          canLoad: [RoleGuardService],
          canActivateChild: [RoleGuardService],
          children: []
        };
        if (!this.isIncluded(organizedRoutes, menuRoute)) {
          organizedRoutes.push(menuRoute);
        }
      }

      if (m.children !== undefined && m.children.length > 0) {
        this.checkMenuRoutes(m.children, organizedRoutes);
      }
    });
  }

  private isIncluded(routes: Routes, route: Route): boolean {
    return routes.length > 0 && undefined !== routes.find(r => r.data?.id === route.data?.id);
  }

  private findRouteById(routes: Routes, id): Route {
    if (id === undefined) {
      return undefined;
    }

    for (const route of routes) {
      if (route.data?.id === id) {
        return route;
      }

      if (route.children !== undefined && route.children.length > 0) {
        const r = this.findRouteById(route.children, id);
        if (r !== undefined) {
          return r;
        }
      }
    }
    return undefined;
  }

  private organizeRoutes(menus: Menu[], routes: Routes, organizedRoutes: Routes, routePath: string) {
    //Por cada ruta buscamos su menú (si tenemos menús contra los que comparar)
    if (menus.length > 0) {
      routes.forEach(route => this.organizeRoutePaths(route, menus, organizedRoutes, routePath));
    }
  }

  private organizeRoutePaths(route: Route, menus: Menu[], organizedRoutes: Routes, routePath: string) {
    let founded = false;
    menus.forEach(menu => {
      const menuFounded = this.findRouteToOrganize(menu, route, organizedRoutes, routePath);
      if (!founded && menuFounded) {
        founded = true;
      }
    });

    if (!founded && !this.isIncluded(organizedRoutes, route) && !route.data?.isMenuFolder) {
      // Si no hemos encontrado un menú para la ruta, lo añadimos al root
        organizedRoutes.push(route);
    }

    //Recorremos recursivamente todas las rutas hijas
    if (route.children !== undefined && route.children.length > 0) {
      this.organizeRoutes(menus, route.children, organizedRoutes, route.path);
    }
  }

  private findRouteToOrganize(menu: Menu, route: Route, organizedRoutes: Routes, parentPath: string): boolean {
    //Comprobamos si el path de la ruta encaja con el path del menú, en cuyo caso lo añadimos a las rutas organizadas
    const routePath = parentPath === '' ? route.path : parentPath.concat('/').concat(route.path);
    const link = menu.link.indexOf('/') ? menu.link.substring(menu.link.lastIndexOf('/') + 1) : menu.link;

    let menuFound: boolean = link === route.path || menu.link === routePath;
    if (menuFound) {
      this.prepareRoute(route, menu, organizedRoutes);
    }

    if (!menuFound && menu.children !== undefined && menu.children.length > 0) {
      for (const childMenu of menu.children) {
        const founded = this.findRouteToOrganize(childMenu, route, organizedRoutes, parentPath);
        if (founded) {
          menuFound = founded;
          break;
        }
      }
    }

    return menuFound;
  }

  private prepareRoute(route: Route, menu: Menu, organizedRoutes: Routes) {
    route.data.id = menu.id;
    route.data.parent = menu.parent?.id;
    route.data.roles = menu.roles;
    if (!this.isIncluded(organizedRoutes, route)) {
      organizedRoutes.push(route);
    }
  }
}
