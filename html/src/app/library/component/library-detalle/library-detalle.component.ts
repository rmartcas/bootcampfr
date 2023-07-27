import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../../service/book/book.service';
import { Book } from '../../model/book/book';

@Component({
  selector: 'app-library-detalle',
  templateUrl: './library-detalle.component.html',
  styleUrls: ['./library-detalle.component.scss'],
})
export class LibraryDetalleComponent implements OnInit, OnDestroy {
  book: Book;
  private bookServiceSubscription: Subscription | undefined;

  constructor(private readonly bookService: BookService) {}

  ngOnInit(): void {
    this.bookServiceSubscription = this.bookService.book.subscribe(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  ngOnDestroy(): void {
    this.bookServiceSubscription?.unsubscribe();
  }
}
