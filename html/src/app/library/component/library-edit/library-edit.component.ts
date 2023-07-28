import { Component, Injector, Input, OnInit } from '@angular/core';
import { CrudEditComponentImpl } from 'src/app/@core/crud/crud-component';
import { Libro } from '../model/libro';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataLoad } from 'src/app/@core/common/model/dataLoad';
import { CrudService } from 'src/app/@core/crud/crud-service';
import { ModalButton } from 'src/app/@core/modules/modal/model/modal-button.model';
import { LibroDataLoad } from 'src/app/mappings/model/libroDataLoad';
import { LibroService } from '../../service/libro.service';

@Component({
  selector: 'app-library-edit',
  templateUrl: './library-edit.component.html',
  styleUrls: ['./library-edit.component.scss']
})
export class LibraryEditComponent extends CrudEditComponentImpl<Libro> implements OnInit {

    /** The model data */
    @Input() model: Libro;

    /** The form with data */
    form: FormGroup;
  
    /** All available profiles for selection */
    data: LibroDataLoad;

    buttons: ModalButton[] = [
      {
        name: 'button.save',
        icon: null,
        btnClass: 'btn-primary',
        handler: this.onSubmit.bind(this),
        roles: [],
        disabledWhenInvalid: true,
  
      },
  
    ];
    constructor(protected injector: Injector, private readonly service: LibroService, private readonly formBuilder: FormBuilder) {
      super(injector);
     }
  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getService(): CrudService<Libro> {
    return this.service;
  }
  getModel(): Libro {
    return this.model;
  }
  getButtons(): ModalButton[] {
    return this.buttons; 
  }
  getForm(): FormGroup<any> {
    throw new Error('Method not implemented.');
  }
  parseForm(form: FormGroup<any>): Libro {
    const model: Libro = this.getModel();
      model.titulo = form.controls.titulo.value;
      return model;
  }
  getDataLoad(): DataLoad {
    return this.data;
  }
  setDataLoad(dataload: DataLoad): void {
    this.data = dataload as LibroDataLoad;
  }
 


}
