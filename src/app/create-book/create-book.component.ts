import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent {

  reactiveForm: FormGroup;
  book: Book = new Book();
  isbnToFind = '';
  authorInput: string = '';
  publisherInput: string = '';


  constructor(private bookService: BookService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      releaseYear: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(2023)])],
      publisher: [null, Validators.required],
      isbn: [null, Validators.compose([Validators.required, Validators.min(1000000000), Validators.max(9999999999999)])]
    });

  }

  updateAuthors() {
    const authorNames = this.authorInput.split(',').map((name) => name.trim());
    const authors = authorNames.map((name) => ({ fullName: name }));
    this.book.authors = authors;
  }

  updatePublishers() {
    const publisherNames = this.publisherInput.split(',').map((name) => name.trim());
    const publishers = publisherNames.map((name) => ({ name: name }));
    this.book.publishers = publishers;
  }

  getValue(val: string) {
    this.isbnToFind = val;
  }

  findBookByISBN() {
    this.bookService.findBookByISBN(this.isbnToFind).subscribe(data => {
      if (data != null) {
        console.log(data);
        this.book.title = data.title ? data.title : '';
        this.book.releaseYear = data.releaseYear ? data.releaseYear : null;
        this.book.isbn = data.isbn;
        this.book.authors = data.authors ? data.authors : [];
        this.book.publishers = data.publishers ? data.publishers : [];

        if (this.book.authors.length != 0) {
          this.authorInput = this.book.authors.map((author) => author.fullName).join(', ');
        }

        if (this.book.publishers.length != 0) {
          this.publisherInput = this.book.publishers.map((publisher) => publisher.name).join(', ');
        }

      } else {
        this.showAlert();
        let isbn = this.book.isbn;
        this.book = new Book();
        this.book.isbn = isbn;
      }


    },

      error => {
        this.showError(error);
      }
    );
  }


  saveBook() {
    console.log(this.bookService);
    this.bookService.createBook(this.book).subscribe(data => {
      this.goToBookList();
      this.showSuccess();

    },
      error => this.showError(error));
  }

  goToBookList() {
    this.router.navigate(["/books"]);

  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      this.updateAuthors();
      this.updatePublishers()
      this.saveBook();
      console.log(this.book);
    }

  }

  showSuccess() {
    this.toastr.success('Książka została dodana!', 'Sukces');
  }
  showError(error) {
    console.log(error);
    if (error.status == 409) {
      this.toastr.error("Istnieje już książka o podanym numerze ISBN!", "Błąd")
    } else {
      this.toastr.error(error, 'Błąd');
    }

  }

  showAlert() {
    this.toastr.warning("Ksiązka nie została znaleziona w zewnętrznym API.", "Brak książki")
  }



}

