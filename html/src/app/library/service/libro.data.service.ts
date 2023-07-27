import { Injectable } from '@angular/core';
import { Libro } from '../component/model/libro';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroDataService {
  public libro: Observable<Libro>;
  private readonly libroSubject: BehaviorSubject<Libro> = new BehaviorSubject({} as Libro);
  constructor() { 
    this.libro = this.libroSubject.asObservable();
  }
  setLibro(libro: Libro):void{
    this.libroSubject.next(libro);
  }
}
