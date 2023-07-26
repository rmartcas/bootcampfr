import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-library',
  templateUrl: './collapse-library.component.html',
  styleUrls: ['./collapse-library.component.scss']
})
export class CollapseComponentLibrary {
  @Input() name: string;
  @Input() isCollapsed = false;
  bookName:string;
  authorName:string;
  ngOnInit(): void {
    this.bookName="Var nombre";
    this.authorName="Var autor";
  }

  btnClickCollapse():void{
    
  
  }
}
