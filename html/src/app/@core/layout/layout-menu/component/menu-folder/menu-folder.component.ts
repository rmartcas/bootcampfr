import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from '../../model/menu';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-menu-folder',
  templateUrl: './menu-folder.component.html',
  styleUrls: ['./menu-folder.component.scss']
})
export class MenuFolderComponent implements OnInit {

  menus$: Observable<Menu[]>;

  currentPath: string;

  constructor(private readonly router: Router, private readonly menusService: MenuService) {
    this.currentPath = router.url;
  }

  ngOnInit() {
    this.menus$ = this.menusService.getMenus();
  }

}
