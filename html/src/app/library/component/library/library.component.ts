import { Component, Injector, OnInit, Type } from "@angular/core";
import { Libro } from "../model/libro";
import { Autor } from "../model/autor";
import { Router } from "@angular/router";
import { CrudComponentImpl, CrudEditComponent } from "src/app/@core/crud/crud-component";
import { CrudService } from "src/app/@core/crud/crud-service";
import { Page } from "src/app/@core/common/model/page";
import { TableButton } from "src/app/shared/components/table/table-button.model";
import { AppTableColumn } from "src/app/shared/components/table/table-column.model";
import { FormGroup } from "@angular/forms";
import { DataLoad } from "src/app/@core/common/model/dataLoad";
import { LibroService } from "../../service/libro.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AddFileSelectionComponent } from "src/app/shared/components/add-file-selection/add-file-selection.component";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent extends CrudComponentImpl<Libro> implements OnInit { //obligatoria la impl
  desplegableName: string;
  colapsado = false;
  modalReference: NgbModalRef;

  private readonly router: Router;
  private readonly service: LibroService;

  private readonly buttons: TableButton[] = [
    {
      icon: 'plus',
      name: 'button.new',
      handler: this.onNew.bind(this),
      roles: [],
    },
    {
      icon: 'file',
      name: 'button.file',
      rowButton: true,
      handler: this.openDocumentModal.bind(this),
      roles: [],
    },
    {
      icon: 'pencil-alt',
      name: 'button.edit',
      rowButton: true,
      handler: this.onEdit.bind(this),
      roles: [],
    },
    {
      icon: 'trash',
      name: 'button.remove',
      rowButton: true,
      handler: this.onDelete.bind(this),
      roles: [],
    },
  ];
  private colModel: AppTableColumn[];
  colors: boolean = true;
  pruebaColor: string = 'aqua';
  color: string = 'red';
  libro: Libro = {
    titulo: "El Quijote",
    id: 0,
    autor: {
      nombre: "Miguel de Cervantes",
      id: 0
    }
  };
  libros: Libro[] = [{
    titulo: "Titulo 1",
    id: 0
  },
  {
    titulo: "Titulo 2",
    id: 1
  },
  {
    titulo: "Titulo 3",
    id: 2
  }
  ];
  constructor(protected readonly injector: Injector, public modalService: NgbModal) {
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
  btnClick(): void {
    if (this.colapsado) {
      this.colapsado = false;
      console.log('false');
    } else {
      this.colapsado = true;
      console.log('true');
    }
  }

  guardar(datos: any): void {
    console.log("Estoy en el padre");
    console.log(datos);
  }

  btnNavegar(): void {
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
      records: [{ titulo: 'Quijote', id: 1 }],
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

  async openDocumentModal(row: Libro): Promise<void> {
    this.modalReference = this.modalService.open(AddFileSelectionComponent, {
      ariaLabelledBy: 'i18n.documentation.fileSelectionModalTitle',
      backdrop: 'static',
      centered: true,
      keyboard: true,
      size: 'lg',
      scrollable: true,
    });
    try {
      const file = (await this.modalReference.result) as File;
      if (file) {
        //this.service.setFile(row, file);
      }
    } catch (rejectedPromise) {}
  }
}