import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppConfigService } from '../../@core/modules/app-config/app-config.service';

@Directive({
  selector: '[appHasAnyRole]'
})
export class HasAnyRoleDirective {

  /**
   * @description Constructor.
   */
   constructor(
      private readonly templateRef: TemplateRef<any>,
      private readonly viewContainer: ViewContainerRef,
      private readonly appConfig: AppConfigService) { }

  /**
   * @description Method to show or hide HTML fragments according to user's role.
   * @param roles Roles for which the HTML fragment will be displayed.
   */
  @Input() set appHasAnyRole(roles: string[]) {
      const hasAnyRole = undefined === roles || null === roles || 0 === roles.length
       || roles.some(role => this.appConfig.getConfig().user.authorities.includes(role));

      if (hasAnyRole) {
          this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
          this.viewContainer.clear();
      }
  }

}
