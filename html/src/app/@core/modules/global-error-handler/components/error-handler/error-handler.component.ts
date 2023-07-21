import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../../global-service/global.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorModalComponent{
  @Input() title: string;
  @Input() modalIcon: string;
  @Input() buttonLabel: string;
  @Input() message: string;
  @Input() errors: any;

  constructor(public activeModal: NgbActiveModal, public globals: GlobalService) {}
}
