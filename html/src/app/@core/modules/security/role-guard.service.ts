import { Injectable } from '@angular/core';
import { CanActivateChild, CanLoad, ActivatedRouteSnapshot,
   Route, Router, CanActivate, UrlTree } from '@angular/router';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate, CanActivateChild, CanLoad {

  private readonly defaultRolePrefix = 'ROLE_';

  constructor(protected router: Router, protected appConfig: AppConfigService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const roles: string[] = route.data.roles || [];
    return this.hasRoles(roles);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot) {
    const roles: string[] = childRoute.data.roles || [];
    return this.hasRoles(roles);
  }

  canLoad(route: Route) {
    const roles: string[] = route.data.roles || [];
    const canLoad = this.hasRoles(roles);
    return canLoad instanceof UrlTree ? false : canLoad;
  }

  protected hasRoles(roles: string[]): boolean | UrlTree {

    if (roles.length > 0) {
      const authorities: string[] = this.appConfig.getConfig().user.authorities;
      const hasRole = roles.filter(role => authorities.indexOf(this.addRolePrefix(this.defaultRolePrefix, role)) !== -1);
      return hasRole.length > 0 ? true : this.router.createUrlTree(['/403']);
    }

    return true;
  }

  private addRolePrefix(defaultRolePrefix: string, role: string) {
    if (role == null) {
      return role;
    }

    if (defaultRolePrefix == null || defaultRolePrefix.length === 0) {
      return role;
    }

    if (role.startsWith(defaultRolePrefix)) {
      return role;
    }
    return defaultRolePrefix + role;
  }
}
