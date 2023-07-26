import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-library',
  templateUrl: './form-library.component.html',
  styleUrls: ['./form-library.component.scss']
})
export class FormLibraryComponent implements OnInit { //obligatoria la impl
  /** The form with table filters */
  form: FormGroup;
  @Output() saveForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() authorNameFromFather:string;
  @Input() bookNameFromFather:string;
  constructor(private readonly formBuilder: FormBuilder) {
    
  }
  
  ngOnInit(): void {
      const today=new Date();
      this.form= this.formBuilder.group({
      bookName: [this.bookNameFromFather, [Validators.maxLength(100), Validators.required]],
      authorName:[this.authorNameFromFather, Validators.maxLength(100)],
      authorAge: ['', Validators.min(0)],
      datePublished: [ today.toISOString().substring(0,10)  , Validators.min(0)]
    });
    
    console.log(today.toISOString().substring(0,10) );


  }

  onSearchLibrary():void{
    if(!this.form.errors){
      const datos = {
        nombreLibro: this.form.get('bookName').value,
        autor: this.form.get('authorName').value,
        edad: this.form.get('authorAge').value,
        fecha: this.form.get('datePublished').value,
      };
      console.log("hijo");
      this.saveForm.emit(datos);
      console.log(datos);
    
    }
 
    
  }
  // parseForm(form: FormGroup): Authority {
  //   const model: Authority = new Authority();
  //   model.name = form.controls.name.value;
  //   model.description = form.controls.description.value;
  //   return model;
  // }

  // getForm(): FormGroup {
  //   return this.form;
  // }
}