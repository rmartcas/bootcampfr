import { Component, Input, OnInit } from "@angular/core";


@Component({
  selector: 'app-library', 
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit { //obligatoria la impl




  desplegableName: string; 
 

  colapsado=false;
  constructor() {
    
  }

  ngOnInit(): void {
    this.desplegableName="Library";
  }

  guardado(datos:any):void{
    console.log('estoy en el padre');
    console.log(datos)
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
}