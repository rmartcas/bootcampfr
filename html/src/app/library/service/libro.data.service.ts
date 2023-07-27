import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Libro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroDataService {
  
  public libro: Observable<Libro>;
  private readonly libroSubject: BehaviorSubject<Libro> =new BehaviorSubject({} as Libro);

  constructor() {
    this.libro = this.libroSubject.asObservable();
  }

  setLibro(libro:Libro):void{
    this.libroSubject.next(libro);
  }
}
