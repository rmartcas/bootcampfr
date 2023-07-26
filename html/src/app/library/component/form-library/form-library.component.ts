import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-library',
  templateUrl: '/form-library.component.html',
  styleUrls: ['./form-library.component.scss'],
})
export class formlibrary implements OnInit {
  form: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {}

  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Input()name:string;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bookname: [this.name, Validators.maxLength(20)],
      autorname: ['', Validators.maxLength(20)],
      edadautor: ['', Validators.min(0)],
      fechaexpedicion: [this.obtenerFechaActual()],
    });
  }

  onSearch(): void {
    if (!this.form.errors) {
      const datos = {
        nombreLibro: this.form.get('bookname').value,
        autorname: this.form.get('autorname').value,
        edadautor: this.form.get('edadautor').value,
        fechaexpedicion: this.form.get('fechaexpedicion').value,
      };
      console.log("estoy en el hijo");
      this.save.emit(datos);
      console.log("Datos enviados");
      console.log(datos);
    }
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }
}
