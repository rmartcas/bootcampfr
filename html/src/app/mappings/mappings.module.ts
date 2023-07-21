import { NgModule, Optional, SkipSelf } from '@angular/core';

import { MappingsRoutingModule } from './mappings-routing.module';
import { MappingsComponent } from './component/mappings/mappings.component';
import { MappingService } from './service/mapping.service';
import { SharedModule } from '../shared/shared.module';
import { MappingEditComponent } from './component/mapping-edit/mapping-edit.component';
import { MappingValidateComponent } from './component/mapping-validate/mapping-validate.component';


@NgModule({
  providers: [MappingService],
  declarations: [MappingsComponent, MappingEditComponent, MappingValidateComponent],
  imports: [
    SharedModule,
    MappingsRoutingModule
  ]
})
export class MappingsModule {

  constructor(@Optional() @SkipSelf() parentModule?: MappingsModule) {
    if (parentModule) {
      throw new Error(
        'MappingsModule is already loaded. Import it in the AppModule only');
    }
  }
}
