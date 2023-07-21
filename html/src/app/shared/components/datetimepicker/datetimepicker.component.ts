import { Component, ElementRef, Injector, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {  NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { noop } from 'rxjs';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DatetimepickerComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: DatetimepickerComponent },
  ]
})
export class DatetimepickerComponent implements OnInit, ControlValueAccessor, Validator {

  @Input()
  value: Date;

  @Input()
  placeholder = 'DD/MM/YYYY HH:mm:ss';

  @Input()
  disabled = false;

  @Input()
  disableUserInput = true;

  @ViewChild('p', { static: true }) p: ElementRef;
  @ViewChild('b', { static: true }) b: ElementRef;

  dateStruct: NgbDateStruct;
  timeStruct: NgbTimeStruct;

  public ngControl: NgControl;

  private onTouched: () => void = noop;

  private onChange: (_: any) => void = noop;

  constructor(private readonly injector: Injector, private readonly renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  writeValue(value: Date): void {
    this.value = value;
    this.updatefromModel();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (undefined !== this.p?.nativeElement) {
      this.renderer.setProperty(this.p?.nativeElement, 'disabled', isDisabled);
    }

    if (undefined !== this.b?.nativeElement) {
      this.renderer.setProperty(this.b?.nativeElement, 'disabled', isDisabled);
    }
  }

  validate(): ValidationErrors {
    return null;
  }

  onBlur() {
    this.onTouched();
  }

  onInputChange($event: any) {
    const newDate = moment($event.currentTarget.value, this.placeholder, true);
    if (!newDate.isValid()) {
      this.value = null;
    } else {
      this.value = newDate.toDate();
    }
    this.updatefromModel();
  }

  onDateChange() {
    this.updateToModel();
  }

  onTimeChange() {
    this.updateToModel();
  }

  updatefromModel() {
    if (this.value === null) {
      this.timeStruct = null;
      this.dateStruct = null;
    } else {
      this.timeStruct = {
        hour: this.value.getHours(),
        minute: this.value.getMinutes(),
        second: this.value.getSeconds()
      };

      this.dateStruct = {
        day: this.value.getDate(),
        month: this.value.getMonth() + 1,
        year: this.value.getFullYear()
      };
    }

    this.onChange(this.value);
  }

  updateToModel() {
    const dateA = this.value || new Date();
    if (!this.timeStruct) {
      this.timeStruct = {
        hour: dateA.getHours(),
        minute: dateA.getMinutes(),
        second: dateA.getSeconds()
      };
    }

    if (this.dateStruct) {
      this.value = new Date(
        this.dateStruct.year,
        this.dateStruct.month - 1,
        this.dateStruct.day,
        this.timeStruct.hour,
        this.timeStruct.minute,
        this.timeStruct.second
      );

      this.onChange(this.value);
    }
  }
}
