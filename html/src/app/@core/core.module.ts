import { NgModule, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Toast notifications
import { ToastrModule } from 'ngx-toastr';

// Ngx translate
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Spinner
import { NgxSpinnerModule } from 'ngx-spinner';

// Interceptors
import { AjaxWaitInterceptor } from './modules/ajax-wait/ajax-wait.interceptor';

// Custom Modules
import { GlobalFontAwesomeModule } from './modules/global-font-awesome/global-font-awesome.module';
import { GlobalErrorHandlerModule } from './modules/global-error-handler/global-error-handler.module';

// Layout
import { LayoutHorizontalComponent } from './layout/layout-horizontal/layout-horizontal.component';
import { LayoutVerticalComponent } from './layout/layout-vertical/layout-vertical.component';
import { LayoutFooterComponent } from './layout/layout-footer/layout-footer.component';
import { LayoutHeaderComponent } from './layout/layout-header/layout-header.component';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';
import { LayoutMenuComponent } from './layout/layout-menu/component/layout-menu.component';

// Provider
import { AppConfigService } from './modules/app-config/app-config.service';

import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BreadcrumbComponent } from './modules/breadcrumb/breadcrumb.component';


import { initializeApp, httpLoaderFactory } from './modules/app-initializer/app-initializer';

import { SharedModule } from '../shared/shared.module';
import { RoleGuardService } from './modules/security/role-guard.service';
import { ApiResponseInterceptor } from './modules/api-response/api-response.interceptor';

import { CsrfHeaderInterceptorInterceptor } from './modules/csrf-header-interceptor/csrf-header-interceptor.interceptor';
import { AuthRedirectInterceptor } from './modules/auth-redirect-interceptor/auth-redirect.interceptor';
import { AppRoutingModule } from '../app-routing.module';
import { MenuFolderComponent } from './layout/layout-menu/component/menu-folder/menu-folder.component';
import { RecaptchaInterceptor } from './modules/security/recaptcha/recatpcha-interceptor/recaptcha.interceptor';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { initializeRecaptcha } from './modules/security/recaptcha/recaptcha-initializer';
import { SwUpdateService } from './modules/sw-update/sw-update.service';

@NgModule({
  declarations: [
    LayoutHorizontalComponent,
    LayoutVerticalComponent,
    NotFoundComponent,
    ForbiddenComponent,
    BreadcrumbComponent,
    LayoutFooterComponent,
    LayoutHeaderComponent,
    LayoutMainComponent,
    LayoutMenuComponent,
    MenuFolderComponent
  ],

  imports: [
    SharedModule,
    BrowserAnimationsModule,
    CommonModule,
    TranslateModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    GlobalFontAwesomeModule, // FontAwesomeModule Config.
    GlobalErrorHandlerModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }), // TranslateModule Confignpm
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened: 5,
      closeButton: true,
      progressBar: true,
      onActivateTick: true
    }),
    RecaptchaV3Module
  ],

  exports: [
    AppRoutingModule,
    CommonModule,

    LayoutVerticalComponent,
    LayoutHorizontalComponent,
    MenuFolderComponent
  ],

  providers: [
    AppConfigService,
    RoleGuardService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfigService, TranslateService, SwUpdateService], multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AjaxWaitInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthRedirectInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CsrfHeaderInterceptorInterceptor, multi: true },
    { provide: RECAPTCHA_V3_SITE_KEY, useFactory: initializeRecaptcha, deps: [AppConfigService] },
    { provide: HTTP_INTERCEPTORS, useClass: RecaptchaInterceptor, multi: true }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
