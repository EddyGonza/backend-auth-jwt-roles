import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']

})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router:Router) {}

login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        console.log("navegando...");
        this.router.navigate(['/usuarios']);
        alert('Login exitoso');
      },
      error: (err: any) => {
        console.error(err);
        alert(JSON.stringify(err.error));
      }
    });
  }
}