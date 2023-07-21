import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesComponent } from './component/profiles/profiles.component';
import { RoleGuardService } from '../@core/modules/security/role-guard.service';

const routes: Routes = [
  { path: '', component: ProfilesComponent,
    data: {
      breadcrumb: 'menu.administration.profiles',
      roles: []
    },
    canActivate: [RoleGuardService]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
