import { NgModule, Optional, SkipSelf } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './component/users/users.component';
import { UserService } from './service/user.service';
import { SharedModule } from '../shared/shared.module';
import { UserEditComponent } from './component/user-edit/user-edit.component';


@NgModule({
  providers: [UserService],
  declarations: [UsersComponent, UserEditComponent],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule {

  constructor(@Optional() @SkipSelf() parentModule?: UsersModule) {
    if (parentModule) {
      throw new Error(
        'UsersModule is already loaded. Import it in the AppModule only');
    }
  }
}
