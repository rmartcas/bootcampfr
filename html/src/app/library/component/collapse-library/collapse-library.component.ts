import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroDataService } from '../../service/libro.data.service';
import { Libro } from '../../model/libro';

@Component({
  selector: 'app-collapse-library',
  templateUrl: './collapse-library.component.html',
  styleUrls: ['./collapse-library.component.scss']
})

export class CollapseComponentLibrary implements OnInit {

  @Input() name: string;
  @Input() isCollapsed = false;

  bookname: string;
  autorname: string;
  private readonly route: ActivatedRoute;
  private readonly router: Router;
  private readonly libroDataService: LibroDataService;
  numero: number;

  constructor(private readonly injector: Injector) {
    this.libroDataService = this.injector.get(LibroDataService);
    this.route = this.injector.get(ActivatedRoute);
    this.router=this.injector.get(Router);
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('idlibro'));
    this.numero = Number(this.route.snapshot.paramMap.get('idlibro'));
  }

  btnClick(): void {
    const libro: Libro = {
      titulo: 'sssss',
      id: 1
    }
    this.libroDataService.setLibro(libro);
  }

  btnCambio():void{
    this.router.navigate([`/library/`]);
  }
}