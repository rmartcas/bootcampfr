import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalButton } from '../../../@core/modules/modal/model/modal-button.model';

@Component({
  selector: 'app-modal-button',
  templateUrl: './modal-button.component.html',
  styleUrls: ['./modal-button.component.scss']
})
export class ModalButtonComponent {

  @Input() buttons: ModalButton[];

  @Input() form: FormGroup;

}
