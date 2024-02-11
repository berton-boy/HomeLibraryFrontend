import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css']
})
export class AddEventDialogComponent {
  eventForm: FormGroup;
  textLabel = 'Opis';
  bookId: number;

  constructor(private fb: FormBuilder, private bookService: BookService, @Inject(MAT_DIALOG_DATA) public data: any, private dateAdapter: DateAdapter<Date>, private toastr: ToastrService) {
    this.dateAdapter.setLocale('pl-PL');
    this.eventForm = this.fb.group({
      eventType: ['', Validators.required],
      description: ['', Validators.required],
      eventDate: [Validators.required]
    });
    this.bookId = data.bookId;
  }

  onEventTypeChange(selectedValue: string) {
    if(selectedValue == "P") {
      this.textLabel = "Komu została pożyczona?";
    } else if (selectedValue == "ZK") {
      this.textLabel = "Czy pamiętasz, gdzie ją ostatnio widziałeś?"
    } else if (selectedValue == "OK") {
      this.textLabel = "Gdzie została odnaleziona?"
    } else if (selectedValue == "UK" || selectedValue == "ZNK") {
      this.textLabel = "W jaki sposób?"
    } else {
      this.textLabel = "Opis"
    }
  }

  handleDateSelection() {
    const dateControl = this.eventForm.get('date');
  if (dateControl) {
    const selectedDate = dateControl.value;
    console.log(selectedDate);
  }
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      formData.eventType = this.mapStringToEnum(formData.eventType);
      {
        this.bookService.addEvent(this.bookId, formData).subscribe(
          (data) => {
            this.showSuccess();
            setTimeout(() => {
              this.refreshPage();
            }, 1000);
            
        },
          (error) => {
            this.showAddingEventFailed();
          })
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }

  private mapStringToEnum(eventType: string): string {
    switch (eventType) {
      case 'P':
        return 'POZYCZENIE_KSIAZKI';
      case 'Z':
        return 'ZWROCENIE_KSIAZKI';
      case 'ZK':
        return 'ZAGUBIENIE_KSIAZKI';
      case 'OK':
        return 'ODNALEZIENIE_KSIAZKI';
      case 'UK':
        return 'USZKODZENIE_KSIAZKI';
      case 'ZNK':
        return 'ZNISZCZENIE_KSIAZKI';
      default:
        return '';
    }
  }
  

  showSuccess() {
    this.toastr.success('Zdarzenie zostało dodane!', 'Sukces');
  }

  showAddingEventFailed() {
    this.toastr.info("Wystąpił błąd podczas dodawania zdarzenia.", "Informacja")
  }

}
