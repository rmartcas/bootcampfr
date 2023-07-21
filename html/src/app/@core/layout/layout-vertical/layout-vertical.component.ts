import { Component } from '@angular/core';
import { LayoutBaseComponent } from '../layout-base/layout-base.component';

@Component({
  selector: 'app-layout-vertical',
  templateUrl: './layout-vertical.component.html',
  styleUrls: ['./layout-vertical.component.scss']
})
export class LayoutVerticalComponent extends LayoutBaseComponent {

  constructor() {
    super();
  }
}
