import { NgModule, Optional, SkipSelf } from '@angular/core';

import { MenusRoutingModule } from './menus-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MenuService } from './service/menu.service';
import { MenusComponent } from './component/menus/menus.component';
import { MenuEditComponent } from './component/menu-edit/menu-edit.component';


@NgModule({
  providers: [MenuService],
  declarations: [
    MenusComponent,
    MenuEditComponent
  ],
  imports: [
    SharedModule,
    MenusRoutingModule
  ]
})
export class MenusModule {
  constructor(@Optional() @SkipSelf() parentModule?: MenusModule) {
    if (parentModule) {
      throw new Error(
        'MenusModule is already loaded. Import it in the AppModule only');
    }
  }
 }
