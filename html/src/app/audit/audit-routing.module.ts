import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService } from '../@core/modules/security/role-guard.service';
import { AuditComponent } from './component/audit/audit.component';


const routes: Routes = [
  { path: '', component: AuditComponent, data: { breadcrumb: 'menu.administration.audit', roles: []  },
    canActivate: [RoleGuardService]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }
