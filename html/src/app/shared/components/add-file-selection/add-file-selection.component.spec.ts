import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileSelectionComponent } from './add-file-selection.component';

describe('AddFileSelectionComponent', () => {
  let component: AddFileSelectionComponent;
  let fixture: ComponentFixture<AddFileSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFileSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFileSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
