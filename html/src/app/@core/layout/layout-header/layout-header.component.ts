import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NavigationWatcher } from '../../modules/navigation-watcher/navigation-watcher.service';
import { AppConfigService } from '../../modules/app-config/app-config.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent {

  environment = environment;

  isMenuCollapsed = true;

  isNavigationLoaderVisibile$: Observable < boolean > = this.navigationWatcher.isNavigationPending$;

  constructor(
    private readonly translateService: TranslateService,
    private readonly navigationWatcher: NavigationWatcher,
    readonly settings: AppConfigService
    ) { }

  get languageSelected() {
    return this.translateService.currentLang;
  }

  useLanguage(language: string) {
    this.translateService.use(language);
  }
}
