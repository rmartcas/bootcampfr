import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

import { MappingValidateComponent } from './mapping-validate.component';

describe('MappingValidateComponent', () => {
  let component: MappingValidateComponent;
  let fixture: ComponentFixture<MappingValidateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingValidateComponent ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        SharedModule
      ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingValidateComponent);
    component = fixture.componentInstance;
    component.data = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onTreeAction treeStatus undefined should be assigned to expanded', () => {
    const event = {
      row: {
        treeStatus: undefined
      }
    };
    component.onTreeAction(event);
    expect(event.row.treeStatus).toBeDefined();
    expect(event.row.treeStatus).toEqual('expanded');
  });

  it('onTreeAction treeStatus collapsed should be assigned to expanded', () => {
    const event = {
      row: {
        treeStatus: 'collapsed'
      }
    };
    component.onTreeAction(event);
    expect(event.row.treeStatus).toBeDefined();
    expect(event.row.treeStatus).toEqual('expanded');
  });

  it('onTreeAction treeStatus expanded should be assigned to collapsed', () => {
    const event = {
      row: {
        treeStatus: 'expanded'
      }
    };
    component.onTreeAction(event);
    expect(event.row.treeStatus).toBeDefined();
    expect(event.row.treeStatus).toEqual('collapsed');
  });
});
