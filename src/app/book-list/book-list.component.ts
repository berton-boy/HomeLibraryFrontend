import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog.component/confirmation-dialog.component.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  books: Book[];

constructor(
  private bookService: BookService,
  private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
   this.getBooks();
   this.paginator = this.paginator;
  }

   getBooks() {
    this.bookService.getBooksList().subscribe(data => {
      this.books = data;
    });
  }

  updateBook(id: number) {
    this.router.navigate(['update-book', id]);
  }

deleteBook(id: number) {
  this.bookService.deleteBook(id).subscribe( data => {
    console.log(data);
       this.getBooks();
       this.showSuccess();
      });
}

searchText: string = '';


confirmAndDeleteBook(id: number) : void{

    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      panelClass: 'mycustomdialog'
    });

  dialogRef.afterClosed().subscribe(result => {
    if ( !!result ) {
       this.deleteBook( id );
    }
  
  });
}

    
    bookDetails(id: number) {
      this.router.navigate(['book-details', id]);
    }

    showSuccess() {
      this.toastr.success('Książka została usunięta!', 'Sukces');
    }
    showError(error) {
      this.toastr.error(error, 'Błąd');
    }

}
