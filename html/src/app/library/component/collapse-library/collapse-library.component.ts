import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-library',
  templateUrl: './collapse-library.component.html',
  styleUrls: ['./collapse-library.component.scss']
})
export class CollapseComponentLibrary {
  @Input() name: string;
  @Input() isCollapsed = false;

  bookname:string;
  autorname:string;

  btnClick():void{

  }
}
