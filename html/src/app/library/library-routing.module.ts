import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './component/library/library.component';
import { CollapseComponentLibrary } from './component/collapse-library/collapse-library.component';

const routes: Routes = [
  { path: '', component: LibraryComponent, data: { breadcrumb: 'Library' } },
  {
    path: 'detalle/:idLibro',
    component: CollapseComponentLibrary,
    data: { breadcrumb: 'detalle' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
