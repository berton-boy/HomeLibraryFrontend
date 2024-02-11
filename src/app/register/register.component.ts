import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    username: '',
    email: '',
    password: ''
  }


  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        const jwtToken = response.token;
        this.authService.setToken(jwtToken);
        this.showSuccess();
        this.router.navigate(["/books"]);
      },
      (error) => {
        this.showRegisterFailed();
       this.user = {}
      }
    );
  }

  onSubmit() {
    this.register();
  }

  showSuccess() {
    this.toastr.success('Rejestracja przebiegła pomyślnie!', 'Sukces');
  }

  showRegisterFailed() {
    this.toastr.info("Rejestracja nie powiodła się.", "Informacja")
  }

}
