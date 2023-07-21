import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService } from '../@core/modules/security/role-guard.service';

import { MappingsComponent } from './component/mappings/mappings.component';

const routes: Routes = [
  { path: '', component: MappingsComponent,
    data: {
      breadcrumb: 'menu.administration.mappings',
      roles: []
    },
    canActivate: [RoleGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingsRoutingModule { }
