import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthoritiesRoutingModule } from './authorities-routing.module';
import { AuthorityService } from './service/authority.service';
import { SharedModule } from '../shared/shared.module';
import { AuthoritiesComponent } from './component/authorities/authorities.component';
import { AuthorityEditComponent } from './component/authority-edit/authority-edit.component';


@NgModule({
  providers: [AuthorityService],
  declarations: [AuthoritiesComponent, AuthorityEditComponent],
  imports: [
    SharedModule,
    AuthoritiesRoutingModule
  ]
})
export class AuthoritiesModule {

  constructor(@Optional() @SkipSelf() parentModule?: AuthoritiesModule) {
    if (parentModule) {
      throw new Error(
        'AuthoritiesModule is already loaded. Import it in the AppModule only');
    }
  }

}
