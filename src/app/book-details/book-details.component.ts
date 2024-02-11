import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  showUploadComponent: boolean = false;
  id: number;
  book: Book;

  constructor(private route: ActivatedRoute,
    private bookService: BookService,
    private http: HttpClient,
    private toastr: ToastrService) {

  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.book = new Book();
    this.bookService.getBookById(this.id).subscribe(data => {
      this.book = data;
      console.log(data);
    })
  }

  toggleUploadComponent() {
    this.showUploadComponent = !this.showUploadComponent;
  }

  public dropped(files: NgxFileDropEntry[]) {
    if (files.length > 0) {
      this.files = files.splice(1);
    }
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.isImageFile(file)) {
            this.checkImageDimensions(file).then((isValid) => {
              
              if(isValid) {
                const formData = new FormData()
              formData.append('image', file, droppedFile.relativePath)

              this.bookService.saveCoverImage(this.book.id, formData)
                .subscribe(data => {
                this.showSuccess();
                setTimeout(() => {
                  this.refreshPage();
                }, 1500);
                })

                
              }  else {
                this.files = [];
                this.showImageSizeError();
              }
            });
            
          } else {
            this.files = [];
            this.showFileTypeError();
          }

        });
      } else {
        this.showFileTypeError();
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  checkImageDimensions(file: File): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result as string;
  
        img.onload = () => {
          const width = img.width;
          const height = img.height;
  
          const isDimensionsValid = width === 320 && height === 500;
          resolve(isDimensionsValid);
        };
      };
  
      reader.readAsDataURL(file);
    });
  }

  isImageFile(file: File): boolean {
    console.log('Sprawdzam format pliku')
    const allowedExtensions = ['jpg', 'jpeg'];

    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    console.log('Czy poprawny: ' + allowedExtensions.includes(fileExtension));
    return allowedExtensions.includes(fileExtension);




  }
  showSuccess() {
    this.toastr.success('Okładka została zapisana!', 'Sukces');
  }

  showCancelMessage() {
    this.toastr.info("Zmiany zostały odrzucone.", "Informacja");
  }

  showFileTypeError() {
    this.toastr.error('Przekazany plik nie jest zdjęciem lub nie ma odpowiedniego formatu.', 'Błąd');
  }

  showImageSizeError() {
    this.toastr.error('Zdjęcie nie posiada odpowiednich wymiarów: 320px x 500px.', 'Błąd');
  }

}
