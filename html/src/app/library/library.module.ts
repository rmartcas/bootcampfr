import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';
import { UserService } from '../users/service/user.service';
import { MenuService } from '../menus/service/menu.service';
import { LibraryComponent } from './component/library/library.component';
import { FormLibraryComponent } from './component/formuLibrary/form-library.component';
import { CollapseComponentLibrary } from './component/collapse-library/collapse-library.component';
import { LibraryDetalleComponent } from './component/library-detalle/library-detalle.component';


@NgModule({
  providers: [MenuService, UserService],
  declarations: [LibraryComponent, FormLibraryComponent, CollapseComponentLibrary, LibraryDetalleComponent], //todos los componentes debajo de este modulo
  imports: [
      SharedModule,
      LibraryRoutingModule
  ]
})
export class LibraryModule {
  constructor(@Optional() @SkipSelf() parentModule?: LibraryModule) {
    if (parentModule) {
      throw new Error(
        'Library is already loaded. Import it in the AppModule only');
    }
  }
}
