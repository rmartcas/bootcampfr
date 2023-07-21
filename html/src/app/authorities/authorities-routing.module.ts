import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleGuardService } from '../@core/modules/security/role-guard.service';
import { AuthoritiesComponent } from './component/authorities/authorities.component';

const routes: Routes = [
  { path: '', component: AuthoritiesComponent,
    data: {
      breadcrumb: 'menu.administration.authorities',
      roles: []
    },
    canActivate: [RoleGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthoritiesRoutingModule { }
