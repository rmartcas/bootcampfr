import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import {Component} from '@angular/core';
import {NgxSpinnerModule} from 'ngx-spinner';

@Component({
  selector: 'app-layout-horizontal',
  template: '<p>Mock Product Settings Component</p>'
})
class MockLayoutHorizontalComponent {
}
describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxSpinnerModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent,
        MockLayoutHorizontalComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
