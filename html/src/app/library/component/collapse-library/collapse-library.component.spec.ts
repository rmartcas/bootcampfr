import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';


import { TranslateModule } from '@ngx-translate/core';

import { CollapseComponentLibrary } from './collapse-library.component';

describe('CollapseComponent', () => {
  let component: CollapseComponentLibrary;
  let fixture: ComponentFixture<CollapseComponentLibrary>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapseComponentLibrary ],
      imports: [
        TranslateModule.forRoot(),
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseComponentLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
