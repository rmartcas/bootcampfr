import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalButton } from '../../../@core/modules/modal/model/modal-button.model';

@Component({
  selector: 'app-mapping-validate',
  templateUrl: './mapping-validate.component.html',
  styleUrls: ['./mapping-validate.component.scss']
})
export class MappingValidateComponent {

  /** The component data to use. To show a message in component must use data.message = "The message to show" */
  @Input() data: [];

  /** Available modal buttons */
  buttons: ModalButton[] = [
    {name: 'button.close', icon: 'times', handler: this.onClose.bind(this)}
  ];

  constructor(public activeModal: NgbActiveModal) { }

  onClose(): void {
    this.activeModal.dismiss();
  }

  onTreeAction(event: any) {
    const row = event.row;
    if (row.treeStatus === undefined || row.treeStatus === 'collapsed') {
      row.treeStatus = 'expanded';
    } else {
      row.treeStatus = 'collapsed';
    }
    this.data = [...this.data];
  }

}
