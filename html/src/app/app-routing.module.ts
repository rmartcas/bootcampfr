import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './@core/pages/not-found/not-found.component';
import { RoleGuardService } from './@core/modules/security/role-guard.service';
import { ForbiddenComponent } from './@core/pages/forbidden/forbidden.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '', data: { appRoutes: true, breadcrumb: 'header.home' },
    children: [ // Todas las rutas deberán colgar de este nivel para organizarse automáticamente con los menús
      { path: 'authorities', loadChildren: () => import('./authorities/authorities.module').then(m => m.AuthoritiesModule),
        data: { roles: []},
        canLoad: [RoleGuardService]
      },
      { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule),
        data: { roles: []},
        canLoad: [RoleGuardService]
      },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: { roles: []},
        canLoad: [RoleGuardService]
      },
      { path: 'mappings', loadChildren: () => import('./mappings/mappings.module').then(m => m.MappingsModule),
        data: { roles: []},
        canLoad: [RoleGuardService]
      },
      { path: 'audit', loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
        data: { roles: []},
        canLoad: [RoleGuardService]
      },
      { path: 'menus', loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule),
        data: { roles: []},
        canLoad: [RoleGuardService]
      }
    ]
  },
  { path: '403', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
