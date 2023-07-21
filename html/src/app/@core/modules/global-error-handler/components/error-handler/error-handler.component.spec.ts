import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorModalComponent } from './error-handler.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';

describe('ErrorHandlerComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;

  const activeModalMock = {
    close: () => ({}),
    dismiss: () => ({})
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorModalComponent],
      imports: [
       TranslateModule.forRoot(),
        FontAwesomeTestingModule
      ],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: activeModalMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));
});
