import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryDetalleComponent } from './library-detalle.component';

describe('LibraryDetalleComponent', () => {
  let component: LibraryDetalleComponent;
  let fixture: ComponentFixture<LibraryDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
