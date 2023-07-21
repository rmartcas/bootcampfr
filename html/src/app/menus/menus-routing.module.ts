import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from '../@core/modules/security/role-guard.service';
import { MenusComponent } from './component/menus/menus.component';

const routes: Routes = [
  { path: '', component: MenusComponent, data: { breadcrumb: 'menu.administration.menus', roles: [] },
    canActivate: [RoleGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
