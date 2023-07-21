import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { AuditViewComponent } from './audit-view.component';

describe('AuditViewComponent', () => {
  let component: AuditViewComponent;
  let fixture: ComponentFixture<AuditViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditViewComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditViewComponent);
    component = fixture.componentInstance;
    const beforeRecord = {};
    const auditStep = 'audit_step';
    beforeRecord[auditStep] = 'BEFORE';

    const afterRecord = {};
    afterRecord[auditStep] = 'AFTER';

    component.model = [beforeRecord, afterRecord];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.getButtons().length).toEqual(0);
    expect(component.getForm()).toBeUndefined();
    expect(component.getModel()).toEqual(component.model);
    expect(component.parseForm()).toEqual(component.model);
  });
});
