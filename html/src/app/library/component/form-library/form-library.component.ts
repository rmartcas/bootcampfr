import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-form-library',
    templateUrl: './form-library.component.html',
    styleUrls: ['./form-library.component.scss']
})

export class FormLibraryComponent implements OnInit {
    /** Declaramos la variable formulario */
    formulario: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.formulario = this.formBuilder.group({
            bookname: ['', Validators.maxLength(10)],
            autorname: ['', Validators.maxLength(100)],
            ageautor: ['', Validators.min(15)],
            datesale: [this.obtenerFechaActual()]
        });

    }

    onSearch(): void {
        if (!this.formulario.errors) {
            const datos = {
                nombreLibro: this.formulario.get('bookname').value,
                nombreAutor: this.formulario.get('autorname').value,
                edadAutor: this.formulario.get('ageautor').value,
                fechaVenta: this.formulario.get('datesale').value,
            };

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




