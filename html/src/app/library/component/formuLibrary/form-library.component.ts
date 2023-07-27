import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-library',
  templateUrl: './form-library.component.html',
  styleUrls: ['./form-library.component.scss']
})
export class FormLibraryComponent implements OnInit {

  form: FormGroup;
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Input() nombre: string;

  constructor(private readonly formBuilder: FormBuilder) { }
  ngOnInit(): void {
    const today = new Date();
    console.log("ngOnInit");

    this.form = this.formBuilder.group({
      bookname: [this.nombre, [Validators.maxLength(20), Validators.required]],
      autorname: ['', Validators.maxLength(20)],
      edadautor: [''],
      fecha: [today.toISOString().substring(0, 10)]

    });

  }
  onSearch() {

    if (!this.form.errors) {
      const datos = {
        nombreLibro: this.form.get('bookname').value,
        nombreAutor: this.form.get('autorname').value,
        edadAutor: this.form.get('edadautor').value,
        fecha: this.form.get('fecha').value,
      };
      this.save.emit(datos);
      console.log("Estoy en el hijo");
      console.log(datos);
      console.log("Datos enviados");

    }
  }
}
