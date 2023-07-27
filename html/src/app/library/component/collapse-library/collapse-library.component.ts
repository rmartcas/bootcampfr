import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../service/book/book.service';
import { Book } from '../../model/book/book';

@Component({
  selector: 'app-collapse-library',
  templateUrl: './collapse-library.component.html',
  styleUrls: ['./collapse-library.component.scss'],
})
export class CollapseComponentLibrary implements OnInit {
  @Input() name: string;
  @Input() isCollapsed = false;

  bookName: string;
  authorName: string;
  bookId:number;
  private readonly route: ActivatedRoute;
  private readonly bookService: BookService
  private readonly router: Router;

  constructor(private readonly injector: Injector) {
    this.route = this.injector.get(ActivatedRoute);
    this.router=this.injector.get(Router);
    this.bookService=this.injector.get(BookService);
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('idLibro'));
    this.bookId=Number(this.route.snapshot.paramMap.get('idLibro'));
  }

  btnClickCollapse(): void {
    const book:Book = {
      title: 'Harry Potter',
      id:4
    }
    this.bookService.setBook(book);
    console.log('libro enviado');
  }
  btnClickNavegar():void{
    this.router.navigate([`/library/`]);
  }
}
