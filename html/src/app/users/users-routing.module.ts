import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService } from '../@core/modules/security/role-guard.service';

import { UsersComponent } from './component/users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent, data: { breadcrumb: 'menu.administration.users', roles: []  },
    canActivate: [RoleGuardService]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
