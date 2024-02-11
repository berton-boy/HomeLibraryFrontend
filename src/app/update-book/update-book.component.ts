import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  id: number;
  book: Book = new Book();
  updateForm: FormGroup;
  authorInput: string = '';
  publisherInput: string = '';

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.bookService.getBookById(this.id).subscribe(data => {
        this.book = data;
        this.authorInput = this.book.authors.map(author => author.fullName).join(', ');
        this.publisherInput = this.book.publishers.map(publisher => publisher.name).join(', ');


      }, error => this.showError(error));

      this.updateForm = this.formBuilder.group({
        title: [null, Validators.required],
        authors:[null, Validators.required],
        releaseYear: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(2023)])],
        publishers: [null, Validators.required],
        isbn: [null, Validators.compose([Validators.required, Validators.min(1000000000), Validators.max(9999999999999)])]
      });
    }

    onSubmit() {
      this.updateAuthors();
      this.updatePublishers();
      
      this.bookService.updateBook(this.id, this.book).subscribe( data => {
        this.goToBookList();
        this.showSuccess();
      }
      , error => this.showError(error));
      
    }

    updateAuthors() {
      const authorNames = this.authorInput.split(',').map((name) => name.trim());
      const authors = authorNames.map((name) => ({ fullName: name }));
      this.book.authors = authors;
      console.log(authors);
    }
  
    updatePublishers() {
      const publisherNames = this.publisherInput.split(',').map((name) => name.trim());
      const publishers = publisherNames.map((name) => ({ name: name }));
      this.book.publishers = publishers;
      console.log(publishers);
    }

    onCancelClick() {
      this.goToBookList();
      this.showCancelMessage();
    }

    goToBookList() {
      this.router.navigate(['/books']);
    }

    showSuccess() {
      this.toastr.success('Zmiany zostały zapisane!', 'Sukces');
    }

    showCancelMessage() {
      this.toastr.info("Zmiany zostały odrzucone.", "Informacja")
    }

    showError(error) {
      this.toastr.error(error, 'Błąd');
    }

}
