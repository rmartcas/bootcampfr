import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuditRoutingModule } from './audit-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuditComponent } from './component/audit/audit.component';
import { AuditViewComponent } from './component/audit-view/audit-view.component';


@NgModule({
  declarations: [AuditComponent, AuditViewComponent],
  imports: [
    SharedModule,
    AuditRoutingModule
  ]
})
export class AuditModule {
  constructor(@Optional() @SkipSelf() parentModule?: AuditModule) {
    if (parentModule) {
      throw new Error(
        'AuditModule is already loaded. Import it in the AppModule only');
    }
  }
 }
