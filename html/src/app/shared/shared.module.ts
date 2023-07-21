import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalFontAwesomeModule } from '../@core/modules/global-font-awesome/global-font-awesome.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

// Components
import { CollapseComponent } from './components/collapse/collapse.component';
import { TableComponent } from './components/table/table.component';
import { HasAnyRoleDirective } from './directives/has-any-role.directive';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ModalButtonComponent } from './components/modal-button/modal-button.component';
import { DatetimepickerComponent } from './components/datetimepicker/datetimepicker.component';
import { MomentPipe } from './pipes/moment/moment.pipe';

@NgModule({
  declarations: [CollapseComponent, TableComponent, HasAnyRoleDirective,
     ConfirmComponent, ModalButtonComponent, DatetimepickerComponent, MomentPipe],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalFontAwesomeModule,
    NgxDatatableModule,
    NgbModule,
    NgSelectModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalFontAwesomeModule,
    NgxDatatableModule,
    CollapseComponent,
    TableComponent,
    ConfirmComponent,
    NgbModule,
    NgSelectModule,
    HasAnyRoleDirective,
    ModalButtonComponent,
    DatetimepickerComponent,
    MomentPipe
  ]
})
export class SharedModule { }
