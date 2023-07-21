import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [],
  imports: [
    FontAwesomeModule, // FontAwesome Module.
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class GlobalFontAwesomeModule {

  constructor(library: FaIconLibrary) {

    // Adds all FAS - FontAwesome Solid Icons
    // https://fontawesome.com/icons?d=gallery&q=menu&s=solid
    library.addIconPacks(fas);
  }
}
