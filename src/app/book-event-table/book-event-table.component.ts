import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-event-table',
  templateUrl: './book-event-table.component.html',
  styleUrls: ['./book-event-table.component.css'],
  providers: [DatePipe]
})
export class BookEventTableComponent {
  @Input() bookEvents: any[];
  @Input() bookId : number;
  constructor(private datePipe: DatePipe, private dialog:MatDialog) {}

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '400px',
      data: {
        bookId: this.bookId
      }
    });
  }
}
