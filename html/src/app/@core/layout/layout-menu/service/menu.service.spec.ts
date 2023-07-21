import { TestBed, waitForAsync } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../../app-routing.module';
import { AppConfigService } from '../../../modules/app-config/app-config.service';
import { BehaviorSubject } from 'rxjs';
import { Config } from '../../../common/model/config';


describe('MenuService', () => {
  let service: MenuService;
  let config: AppConfigService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        MenuService,
        AppConfigService
      ]
    });
    service = TestBed.inject(MenuService);
    config = TestBed.inject(AppConfigService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load menus', () => {
    const cfg = new Config();
    cfg.menus = [
      { id: 1, title: 'menu.administration', link: 'administration', icon: 'cogs',
      roles: ['READ_AUTHORITIES', 'WRITE_USERS', 'READ_MAPPINGS'], enabled: true,
      parent: undefined, children: [
          { id: 2, title: 'authorities', link: 'authorities', icon: 'id-card', children: undefined,
            parent: { id: 1, title: 'menu.administration', link: 'administration', icon: 'cogs',
              roles: ['READ_AUTHORITIES', 'WRITE_USERS', 'READ_MAPPINGS'], enabled: true,
              children: undefined, parent: undefined}, roles: ['AUTH'], enabled: true }
        ]
      },
      { id: 8, title: 'administracion', link: 'admin', icon: 'id-card', children: undefined,
       parent: undefined, roles: ['AUDIT'], enabled: false }
    ];

    const subject = new BehaviorSubject<Config>(new Config());
    config.cache$ = subject.asObservable();
    subject.next(cfg);
    service.getMenus(true).subscribe(m => {
      expect(m).toBe(cfg.menus);
    });
  });
});
