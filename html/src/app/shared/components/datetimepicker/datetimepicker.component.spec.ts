import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Renderer2, ViewChild } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';
import { SharedModule } from '../../shared.module';

import { DatetimepickerComponent } from './datetimepicker.component';

describe('DatetimepickerComponent', () => {
  @Component({
    selector: `app-datetime-host-component`,
    template: `<app-datetimepicker></app-datetimepicker>`
  })
  class TestHostComponent {

    @ViewChild(DatetimepickerComponent) dtp: DatetimepickerComponent;
  }

  let component: DatetimepickerComponent;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimepickerComponent, TestHostComponent ],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        NgControl,
        Renderer2
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
    component = testHostComponent.dtp;
    component.value = new Date();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('when blur touched must be called', () => {
    const onTouched = () => expect(true).toBeTrue();
    component.registerOnTouched(onTouched);
    component.onBlur();
  });

  it('on date change model is updated', () => {
    const onChange = () => expect(true).toBeTrue();
    component.registerOnChange(onChange);
    const modelUpdate = spyOn(component, 'updateToModel');
    component.onDateChange();
    expect(modelUpdate).toHaveBeenCalled();
  });

  it('on time change model is updated', () => {
    const onChange = () => expect(true).toBeTrue();
    component.registerOnChange(onChange);
    const modelUpdate = spyOn(component, 'updateToModel');

    component.onTimeChange();
    expect(modelUpdate).toHaveBeenCalled();
  });

  it('on input change with invalid date value is null', () => {
    const modelUpdate = spyOn(component, 'updatefromModel');
    const event = {
      currentTarget: {
        value: '31/02/2021 23:59:59'
      }
    };
    component.onInputChange(event);

    expect(component.value).toBeNull();
    expect(modelUpdate).toHaveBeenCalled();
  });

  it('on input change with valid date value is the selected date', () => {
    const modelUpdate = spyOn(component, 'updatefromModel');
    const event = {
      currentTarget: {
        value: '08/05/2021 23:59:59'
      }
    };
    component.onInputChange(event);
    const expectedDate = new Date(2021, 4, 8, 23, 59, 59);
    expect(component.value).toEqual(expectedDate);
    expect(modelUpdate).toHaveBeenCalled();
  });

  it('on updateToModel without timeStruct and with dateStruct', () => {
    component.timeStruct = undefined;
    component.dateStruct = {year: 2021, month: 12, day: 31};
    component.updateToModel();

    const expectedDate = new Date(2021, 11, 31, 0, 0, 0);
    expect(component.value.getFullYear()).toEqual(expectedDate.getFullYear());
    expect(component.value.getMonth()).toEqual(expectedDate.getMonth());
    expect(component.value.getDate()).toEqual(expectedDate.getDate());
  });

  it('on updatefromModel with date', () => {
    component.value = new Date();
    component.updatefromModel();

    expect(component.dateStruct.year).toEqual(component.value.getFullYear());
    expect(component.dateStruct.month - 1).toEqual(component.value.getMonth());
    expect(component.dateStruct.day).toEqual(component.value.getDate());

    expect(component.timeStruct.hour).toEqual(component.value.getHours());
    expect(component.timeStruct.minute).toEqual(component.value.getMinutes());
    expect(component.timeStruct.second).toEqual(component.value.getSeconds());
  });


});
