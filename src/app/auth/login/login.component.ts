import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  @ViewChild('signupModal') signupModal: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal, 
    private authService : AuthService, private router : Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      avatar: ['https://picsum.photos/800', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
          this.router.navigate(['/layout/product']);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Invalid credentials. Try again.');
        }
      });
    }
  }

  openSignupModal() {
    this.modalService.open(this.signupModal, { size: 'lg', backdrop: 'static' });
  }

  onSignup() {
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);
      alert('User signed up successfully!');
      this.modalService.dismissAll(); // Close the modal after signup
    }
  }

  onSubmit(){}
}
