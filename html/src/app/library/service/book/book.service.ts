import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../../model/book/book';
import { CrudServiceImpl } from 'src/app/@core/crud/crud-service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/@core/modules/app-config/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class BookService  extends CrudServiceImpl<Book> {
 
  public book: Observable<Book>;
  private readonly bookSubject: BehaviorSubject<Book> = new BehaviorSubject(
    {} as Book
  );
  constructor(http: HttpClient, appConfig: AppConfigService) {
    super(http, appConfig);
    this.book = this.bookSubject.asObservable();
  }
  setBook(book: Book): void {
    this.bookSubject.next(book);
  }

  getServiceUrl() {
    return this.config.getConfig().api.book;
  }
}
