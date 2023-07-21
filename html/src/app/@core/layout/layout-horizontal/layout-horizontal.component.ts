import { Component } from '@angular/core';
import { LayoutBaseComponent } from '../layout-base/layout-base.component';

@Component({
  selector: 'app-layout-horizontal',
  templateUrl: './layout-horizontal.component.html',
  styleUrls: ['./layout-horizontal.component.scss']
})
export class LayoutHorizontalComponent extends LayoutBaseComponent {

  constructor() {
    super();
  }
}
