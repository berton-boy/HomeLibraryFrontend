import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';


  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const jwtToken = response.token;
        this.authService.setToken(jwtToken);
        this.showSuccess();
        this.router.navigate(["/books"]);
      },
      (error) => {
       this.showLoginFailed();
       this.username = "";
       this.password = "";
      }
    );
  }

  showSuccess() {
    this.toastr.success('Logowanie przebiegło pomyślnie!', 'Sukces');
  }

  showLoginFailed() {
    this.toastr.info("Nieprawidłowa nazwa użytkownika lub hasło.", "Informacja")
  }

}
