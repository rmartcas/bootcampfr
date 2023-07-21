import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseComponent } from './collapse.component';
import { TranslateModule } from '@ngx-translate/core';
import {SharedModule} from '../../shared.module';

describe('CollapseComponent', () => {
  let component: CollapseComponent;
  let fixture: ComponentFixture<CollapseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapseComponent ],
      imports: [
        TranslateModule.forRoot(),
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
