import { Injectable, Injector } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

/**
 * @description Service Worker new versions checker
 */
@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  /** The reference to current opened modal (if any) */
  private modalRef: NgbModalRef;

  constructor(protected injector: Injector, private readonly swUpdate: SwUpdate) {
    console.log('Subscribing to swUpdate.versionUpdates');
    swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(evt => {
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          this.showNewVersionPopup();
        });
  }

  protected showNewVersionPopup() {
    const ngmodal = this.injector.get(NgbModal);
    const modalConfig: NgbModalOptions = {
        ariaLabelledBy: 'modal-title',
        backdrop: 'static',
        centered: false,
        keyboard: false,
        size: 'md',
        scrollable: true,
        modalDialogClass: 'modal-custom'
    };
    this.modalRef = ngmodal.open(ConfirmComponent, modalConfig);
    this.modalRef.componentInstance.data = {
        message: 'i18n.messages.new.version'
    };

    this.modalRef.result.then((confirm) => {
        if (true === confirm) {
          document.location.reload();
        }
    }, () => {});
  }
}
