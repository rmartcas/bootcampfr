import { Component, Injector, OnInit, Type } from '@angular/core';
import { Book } from '../../model/book/book';
import { Author } from '../../model/author/author';
import { Router } from '@angular/router';
import {
  CrudComponentImpl,
  CrudEditComponent,
} from 'src/app/@core/crud/crud-component';
import { CrudService } from 'src/app/@core/crud/crud-service';
import { Page } from 'src/app/@core/common/model/page';
import { TableButton } from 'src/app/shared/components/table/table-button.model';
import { FormGroup } from '@angular/forms';
import { DataLoad } from 'src/app/@core/common/model/dataLoad';
import { AppTableColumn } from 'src/app/shared/components/table/table-column.model';
import { BookService } from '../../service/book/book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent
  extends CrudComponentImpl<Book>
  implements OnInit
{
  //obligatoria la impl
  desplegableName: string;
  colapsado: boolean = false;
  autorNombre: string = 'Juan Pérez';
  bookNombre: string = 'Book de JP';
  colors: boolean = true;
  colorsString: string = 'yellow';
  book: Book = {
    title: 'The Picture of Dorian Gray',
    id: 0,
    authorName: {
      name: 'Oscar Wilde',
      id: 0,
    },
  };

  booksList: Book[] = [
    {
      title: 'Book1 Title',
      id: 1,
    },
    {
      title: 'Book2 Title',
      id: 2,
    },
    {
      title: 'Book3 Title',
      id: 3,
    },
  ];

  private readonly router: Router;
  private readonly service: BookService;
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
      handler: this.onEdit.bind(this),
      roles: [],
    },

    {
      icon: 'trash',
      name: 'button.remove',
      handler: this.onDelete.bind(this),
      roles: [],
    },
  ];
  private colModel: AppTableColumn[];


  constructor(protected injector: Injector) {
    super(injector);
    this.router = this.injector.get(Router);
    this.service = this.injector.get(BookService);
    this.colModel= [
      {
        name: 'title',
        prop: 'title',
        propertyOrder: 'filters.title',
      }
    ];
  }

  ngOnInit(): void {
    this.desplegableName = 'Library';
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
  showInfoForm(datos: any): void {
    console.log('padre');
    console.log(datos);
  }
  btnClickNavegar(): void {
    const ruta = 1;
    this.router.navigate([`/library/detalle/${ruta}`]);
  }

  getService(): CrudService<Book> {
    return this.service;
  }

  getModalComponent(): Type<CrudEditComponent<Book>> {
    throw new Error('Method not implemented.');
    
  }

  getPage(): Page<Book> {
    return {
      size: 10,
      totalRecords: 10,
      records: [{title: 'First book', id:21}],
      currentPage: 1,
      totalPages: null,
      pageOrder: null,
      filters: { id: 0, title: '' },
    };
  }

  getButtons(): TableButton[] {
    return this.buttons;
  }

  getColumnModel(): AppTableColumn[] {
    return this.colModel;
  }

  parseForm(form: FormGroup<any>): Book {
    throw new Error('Method not implemented.');
  }

  getForm(): FormGroup<any> {
    throw new Error('Method not implemented.');
  }

  createModel(): Book {
    return new Book;
  }

  getDataLoad(): DataLoad {
    throw new Error('Method not implemented.');
  }

  setDataLoad(dataload: DataLoad): void {
    throw new Error('Method not implemented.');
  } //obligatoria la impl
}
