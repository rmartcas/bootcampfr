import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './component/library/library.component';

const routes: Routes = [{ path: '', component: LibraryComponent, data: { breadcrumb: 'Library' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
