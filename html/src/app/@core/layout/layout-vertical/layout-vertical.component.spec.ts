import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutVerticalComponent } from './layout-vertical.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Component} from '@angular/core';

@Component({
  selector: 'app-layout-header',
  template: '<p>Mock Product Settings Component</p>'
})
class MockLayoutHeaderComponent {
}

@Component({
  selector: 'app-layout-footer',
  template: '<p>Mock Product Settings Component</p>'
})
class MockLayoutFooterComponent {
}

@Component({
  selector: 'app-layout-main',
  template: '<p>Mock Product Settings Component</p>'
})
class MockLayoutMainComponent {
}

describe('LayoutVerticalComponent', () => {
  let component: LayoutVerticalComponent;
  let fixture: ComponentFixture<LayoutVerticalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutVerticalComponent,
        MockLayoutHeaderComponent,
        MockLayoutFooterComponent,
        MockLayoutMainComponent
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
