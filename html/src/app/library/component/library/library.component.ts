import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit { //obligatoria la impl
  desplegableName: string; 
  colapsado=false;
  autorNombre="Juan Pérez";
  libroNombre="Libro de JP";
  constructor() {
    
  }

  ngOnInit(): void {
    this.desplegableName="Library";
  }
  btnClick():void{
    
    

    if(this.colapsado){
      this.colapsado=false;
      console.log('false');
    }else{
      this.colapsado=true;
      console.log('true');
    }
  }
  showInfoForm(datos:any):void{
    console.log("padre");
    console.log(datos);
  }
}