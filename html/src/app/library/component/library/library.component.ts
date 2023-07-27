import { Component, Injector, Input, OnInit, Type } from "@angular/core";
import { Libro } from "../../model/libro";
import { Autor } from "../../model/autor";
import { Router } from "@angular/router";
import { CrudComponentImpl, CrudEditComponent } from "src/app/@core/crud/crud-component";
import { FormGroup } from "@angular/forms";
import { DataLoad } from "src/app/@core/common/model/dataLoad";
import { Page } from "src/app/@core/common/model/page";
import { CrudService } from "src/app/@core/crud/crud-service";
import { TableButton } from "src/app/shared/components/table/table-button.model";
import { AppTableColumn } from "src/app/shared/components/table/table-column.model";
import { LibroService } from "../../service/libro.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})

export class LibraryComponent extends CrudComponentImpl<Libro> implements OnInit { //obligatoria la impl

  colors: boolean = true;
  pruebaColor: string = 'blue';
  desplegableName: string;
  colapsado = false;

  private readonly router: Router;
  private readonly service: LibroService;
  private colModel: AppTableColumn[];
  private readonly buttons: TableButton[] = [
    {
      icon: 'plus',
      name: 'button.new',
      handler: this.onNew.bind(this),
      roles: [],
    },
    {
      icon: 'pencil-alt',
      name: 'button.edit',
      handler: this.onNew.bind(this),
      roles: [],
    },
    {
      icon: 'trash',
      name: 'button.remove',
      handler: this.onDelete.bind(this),
      roles: [],
    },

  ];

  libro: Libro = {
    titulo: 'titulo prueba',
    id: 0,
    autor: {
      nombreAutor: "autor",
      id: 0
    }
  };

  libros: Libro[] = [{
    titulo: 'titulo 1',
    id: 1
  },
  {
    titulo: 'titulo 2',
    id: 2
  }
  ];


  constructor(protected readonly injector: Injector) {
    super(injector);
    this.router = this.injector.get(Router);
    this.service = this.injector.get(LibroService);
    this.colModel = [
      {
        name: 'titulo',
        prop: 'titulo',
        propertyOrder: 'filters.titulo',
      }

    ];
  }

  ngOnInit(): void {
    this.desplegableName = "Library";
  }

  guardado(datos: any): void {
    console.log('estoy en el padre');
    console.log(datos)
  }



  btnClick(): void {

    if (this.colapsado) {
      this.colapsado = false;
      console.log('false');
    } else {
      this.colapsado = true;
      console.log('true');
    }
  }

  btnCambio(): void {
    const ruta = 1;
    this.router.navigate([`/library/detalle/${ruta}`]);
  }


  getService(): CrudService<Libro> {
    return this.service;
  }

  getModalComponent(): Type<CrudEditComponent<Libro>> {
    throw new Error("Method not implemented.");
  }

  getPage(): Page<Libro> {
    return {
      size: 10,
      totalRecords: 1,
      records: [ {titulo:'qhijote',id:1 }],
      currentPage: 1,
      totalPages: null,
      pageOrder: null,
      filters: { id: 0, titulo: '' },
    };
  }

  getButtons(): TableButton[] {
    return this.buttons;
  }

  getColumnModel(): AppTableColumn[] {
    return this.colModel;
  }

  parseForm(form: FormGroup<any>): Libro {
    throw new Error("Method not implemented.");
  }

  getForm(): FormGroup<any> {
    throw new Error("Method not implemented.");
  }

  createModel(): Libro {
    return new Libro;
  }

  getDataLoad(): DataLoad {
    throw new Error("Method not implemented.");
  }

  setDataLoad(dataload: DataLoad): void {
    throw new Error("Method not implemented.");
  } //obligatoria la impl
}