import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../model/menu';
import { MenuService } from '../service/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrls: ['./layout-menu.component.scss']
})
export class LayoutMenuComponent implements OnInit {

  @Input()
  isMenuCollapsed = true;

  menus$: Observable<Menu[]>;

  constructor(private readonly menusService: MenuService) { }

  ngOnInit() {
    this.menus$ = this.menusService.getMenus(true);
  }
}
