import { AppConfigService } from '../app-config/app-config.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';

export const initializeApp = (cfg: AppConfigService, i18nService: TranslateService) => () => cfg.load()
.pipe(tap(() => translationSetup(cfg, i18nService)));

const translationSetup = (configService: AppConfigService, translateService: TranslateService) => {
    try {
      const config = configService.getConfig();
      translateService.setDefaultLang(configService.getConfig().defaultLocale);
      translateService.addLangs(configService.getConfig().locales);
      const browserLang = translateService.getBrowserLang();
      let initLanguage: string;
      if (config.locale !== config.defaultLocale) {
        initLanguage = config.locale;
      } else if (translateService.langs.includes(browserLang)) {
        initLanguage = browserLang;
      } else {
        initLanguage = config.defaultLocale;
      }
      translateService.use(initLanguage);
    } catch (error) {
      translateService.setDefaultLang('en');
      translateService.use('en');
      translateService.setTranslation('en', {
        'i18n.error.title': 'Error',
        'i18n.error.404': '404 - Errors have occurred during application initialization, contact the administrator',
        'i18n.error.500': '500 - Errors have occurred during application initialization, contact the administrator',
        'i18n.error.504': '504 - Errors have occurred during application initialization, contact the administrator'
      });
    }
};

export const httpLoaderFactory = (httpClient: HttpClient) => new TranslateHttpLoader(httpClient,
   `${environment.api.base + environment.api.locale}/`, '');
