import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  book: Book = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false;

  constructor(private bookService: BooksService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.bookService.getBook(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.book = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewBook() {
    delete this.book.created_at;
    delete this.book.id;
    this.bookService.saveBook(this.book)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/books']);
        },
        err => console.error(err)
      )
  }

  updateBook() {
    delete this.book.created_at;
    this.bookService.updateBook(this.book.id as number, this.book)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/books']);
        },
        err => console.error(err)
      )
  }


}
