import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  /** The component data to use. To show a message in component must use data.message = "The message to show" */
  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) { }
}
