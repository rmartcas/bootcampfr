import { HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../../app-config/app-config.service';

export interface Recaptcha {

    /**
     * @description Check for recaptcha V3 action for the requested url
     * @returns headers with recaptcha header. The header name is retreived from config.
     *  The initial value is the url action. The final action send will be the token exchanged by RecaptchaInterceptor.
     */
    getRecaptcha(config: AppConfigService, url: any): HttpHeaders;
}
