import { Subscription } from 'rxjs';
import { LibroDataService } from '../../service/libro.data.service';
import { Libro } from '../model/libro';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-library-detalle',
  templateUrl: './library-detalle.component.html',
  styleUrls: ['./library-detalle.component.scss']
})
export class LibraryDetalleComponent implements OnInit, OnDestroy {
  libro: Libro;
  private libroDataServiceSubscription: Subscription | undefined;

  constructor(private readonly libroDataService: LibroDataService) {
}

ngOnInit(): void {
  this.libroDataServiceSubscription =
    this.libroDataService.libro.subscribe((libro: Libro) => {
        this.libro= libro;
      }
    );
}
ngOnDestroy(): void {
  this.libroDataServiceSubscription?.unsubscribe();
}
 
}


