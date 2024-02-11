import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { FormsModule } from '@angular/forms';
import { UpdateBookComponent } from './update-book/update-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponentComponent } from './confirmation-dialog.component/confirmation-dialog.component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SearchPipe } from './search.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { JwtInterceptor } from './jwt-interceptor.service';
import { SecurePipePipe } from './secure-pipe.pipe';
import { BookEventTableComponent } from './book-event-table/book-event-table.component';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { OrderByEventDatePipe } from './order-by-event-date.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';





@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    CreateBookComponent,
    UpdateBookComponent,
    BookDetailsComponent,
    ConfirmationDialogComponentComponent,
    SearchPipe,
    LoginComponent,
    RegisterComponent,
    SecurePipePipe,
    BookEventTableComponent,
    AddEventDialogComponent,
    OrderByEventDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    ToastrModule.forRoot(),
    NgxFileDropModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
