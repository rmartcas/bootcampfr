import { Injectable, Injector, NgZone, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../global-error-handler/components/error-handler/error-handler.component';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../global-service/global.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {

  /** Subject to store subscriptions and unsubscribe when component is destroyed */
  protected destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly injector: Injector, private readonly toastr: ToastrService,
              private readonly translate: TranslateService, private readonly global: GlobalService) { }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }

  info(message: string, title?: string,  modal = false, params: any = []) {
    this.show(message, title, modal, params, this.toastr.toastrConfig.iconClasses.info);
  }

  warning(message: string, title?: string,  modal = false, params: any = []) {
    this.show(message, title, modal, params, this.toastr.toastrConfig.iconClasses.warning);
  }

  success(message: string, title?: string,  modal = false, params: any = []) {
    this.show(message, title, modal, params, this.toastr.toastrConfig.iconClasses.success);
  }

  error(message: string, title?: string, modal = false, errors: any = []) {
    this.show(message, title, modal, errors, this.toastr.toastrConfig.iconClasses.error, { timeOut: 0 });
  }

  show(message: string, title?: string,  modal = false, params: any = [], type = '', override?: any) {
    if (modal) {
      this.showModal(title, message, 'button.ok', params);
    } else {
      if (params && params.length > 0) {
        params.forEach((error: { [x: string]: any[] }) => {
          this.processError(error, title, type, override);
        });
      } else {
        this.translate.get([title, message]).pipe(takeUntil(this.destroy$)).subscribe((res: string) => {
          this.toastr.show(res[message], res[title], override, type);
        });
      }
    }
  }

  showModal(title: string, message: string, buttonLabel: string, errors: any = []) {
    const zone = this.injector.get(NgZone);
    zone.run(() => {
      const modalService = this.injector.get(NgbModal);

      if (!modalService.hasOpenModals()) {
        const errorModalRef = modalService.open(ErrorModalComponent, {
          backdrop: 'static',
          centered: true,
          keyboard: false,
          size: 'md',
          backdropClass: 'hello',
          windowClass: 'hello'
        });
        errorModalRef.componentInstance.title = title;
        errorModalRef.componentInstance.modalIcon = 'times-circle';
        errorModalRef.componentInstance.buttonLabel = buttonLabel;
        errorModalRef.componentInstance.message = message;
        errorModalRef.componentInstance.errors = errors;
      }
    });
  }

  private processError(error: { [x: string]: any[] }, title: string, type = '', override?: any) {
    for (const key in error) {
      if (Object.prototype.hasOwnProperty.call(error, key)) {
        const params = error[key] || [];
        this.translate.get(params).pipe(takeUntil(this.destroy$)).subscribe(values => {
          for (let index = 0; index < params.length; index++) {
            params[index] = values[params[index]];
          }
        });
        this.translate.get([title, key], this.global.toObject(params)).pipe(takeUntil(this.destroy$)).subscribe((res: string) => {
          this.toastr.show(res[key], res[title], override, type);
        });
      }
    }
  }
}


