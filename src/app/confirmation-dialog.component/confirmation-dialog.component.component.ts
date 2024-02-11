import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog.component',
  templateUrl: './confirmation-dialog.component.component.html',
  styleUrls: ['./confirmation-dialog.component.component.css']
})
export class ConfirmationDialogComponentComponent {
  message: string = ""
    confirmButtonText = ""
    cancelButtonText = ""
    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ConfirmationDialogComponentComponent>) {
        if(data){
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
      }

      onConfirmDeleteBook(): void {
        this.dialogRef.close(true);
    }
}
