import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      passwordHash: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const login: Login = this.loginForm.value;
      console.log(login)
      this.authService.login(login.userName, login.passwordHash).subscribe({
        next: response => {
          if (response) {
            this.router.navigate(['/product/list']);
          } else {
            console.error('Login failed');
          }
        },
        error: error => {
          console.error('Login error', error);
        }
      });
    }
  }
}
