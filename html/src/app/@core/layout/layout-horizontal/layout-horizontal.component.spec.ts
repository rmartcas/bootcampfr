import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutHorizontalComponent } from './layout-horizontal.component';
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

describe('LayoutHorizontalComponent', () => {
  let component: LayoutHorizontalComponent;
  let fixture: ComponentFixture<LayoutHorizontalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutHorizontalComponent,
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
    fixture = TestBed.createComponent(LayoutHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
