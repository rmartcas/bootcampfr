import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { ProfileEditComponent } from './component/profile-edit/profile-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileService } from './service/profile.service';


@NgModule({
  providers: [ProfileService],
  declarations: [ProfilesComponent, ProfileEditComponent],
  imports: [
    SharedModule,
    ProfilesRoutingModule
  ]
})
export class ProfilesModule {

  constructor(@Optional() @SkipSelf() parentModule?: ProfilesModule) {
    if (parentModule) {
      throw new Error(
        'ProfilesModule is already loaded. Import it in the AppModule only');
    }
  }
}
