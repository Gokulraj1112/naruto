import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  template: `
    <app-notification></app-notification>
    
    <div class="auth-page">
      <div class="container">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h1>{{ isLoginMode ? 'Welcome Back' : 'Create Account' }}</h1>
              <p>{{ isLoginMode ? 'Sign in to your account' : 'Join the ShopEasy community' }}</p>
            </div>

            <form (ngSubmit)="onSubmit()" #authForm="ngForm" class="auth-form">
              <div class="form-group" *ngIf="!isLoginMode">
                <label for="firstName" class="form-label">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  class="form-input"
                  [(ngModel)]="formData.firstName"
                  required
                  #firstName="ngModel"
                >
                <div class="error-message" *ngIf="firstName.invalid && firstName.touched">
                  First name is required
                </div>
              </div>

              <div class="form-group" *ngIf="!isLoginMode">
                <label for="lastName" class="form-label">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  class="form-input"
                  [(ngModel)]="formData.lastName"
                  required
                  #lastName="ngModel"
                >
                <div class="error-message" *ngIf="lastName.invalid && lastName.touched">
                  Last name is required
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  class="form-input"
                  [(ngModel)]="formData.email"
                  required
                  email
                  #email="ngModel"
                >
                <div class="error-message" *ngIf="email.invalid && email.touched">
                  <span *ngIf="email.errors?.['required']">Email is required</span>
                  <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <div class="password-input">
                  <input 
                    [type]="showPassword ? 'text' : 'password'"
                    id="password"
                    name="password"
                    class="form-input"
                    [(ngModel)]="formData.password"
                    required
                    minlength="6"
                    #password="ngModel"
                  >
                  <button 
                    type="button" 
                    class="password-toggle"
                    (click)="togglePassword()"
                  >
                    <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
                  </button>
                </div>
                <div class="error-message" *ngIf="password.invalid && password.touched">
                  <span *ngIf="password.errors?.['required']">Password is required</span>
                  <span *ngIf="password.errors?.['minlength']">Password must be at least 6 characters</span>
                </div>
              </div>

              <div class="form-group" *ngIf="!isLoginMode">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input 
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-input"
                  [(ngModel)]="formData.confirmPassword"
                  required
                  #confirmPassword="ngModel"
                >
                <div class="error-message" *ngIf="confirmPassword.invalid && confirmPassword.touched">
                  Please confirm your password
                </div>
                <div class="error-message" *ngIf="formData.password !== formData.confirmPassword && confirmPassword.touched">
                  Passwords do not match
                </div>
              </div>

              <div class="form-options" *ngIf="isLoginMode">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
                  <span class="checkmark"></span>
                  Remember me
                </label>
                <a href="#" class="forgot-password">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary auth-btn"
                [disabled]="authForm.invalid || isSubmitting"
              >
                <i class="fas fa-spinner fa-spin" *ngIf="isSubmitting"></i>
                {{ isSubmitting ? 'Please wait...' : (isLoginMode ? 'Sign In' : 'Create Account') }}
              </button>
            </form>

            <div class="auth-divider">
              <span>or</span>
            </div>

            <div class="social-auth">
              <button class="social-btn google-btn">
                <i class="fab fa-google"></i>
                Continue with Google
              </button>
              <button class="social-btn facebook-btn">
                <i class="fab fa-facebook-f"></i>
                Continue with Facebook
              </button>
            </div>

            <div class="auth-switch">
              <p>
                {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
                <button type="button" class="switch-btn" (click)="toggleMode()">
                  {{ isLoginMode ? 'Sign up' : 'Sign in' }}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 80vh;
      display: flex;
      align-items: center;
      padding: 2rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100%;
    }

    .auth-card {
      background: white;
      padding: 3rem;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 450px;
      animation: slideUp 0.6s ease-out;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-header h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .auth-header p {
      color: #6b7280;
      font-size: 1rem;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }

    .form-input {
      padding: 0.875rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-input.ng-invalid.ng-touched {
      border-color: #ef4444;
    }

    .password-input {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
    }

    .password-toggle:hover {
      color: #374151;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .checkbox-label input[type="checkbox"] {
      margin: 0;
    }

    .forgot-password {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .forgot-password:hover {
      color: #764ba2;
    }

    .auth-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
      font-weight: 600;
      margin-top: 0.5rem;
    }

    .auth-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .auth-divider {
      text-align: center;
      margin: 2rem 0;
      position: relative;
    }

    .auth-divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e5e7eb;
    }

    .auth-divider span {
      background: white;
      padding: 0 1rem;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .social-auth {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .social-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      color: #374151;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .social-btn:hover {
      border-color: #d1d5db;
      background: #f9fafb;
    }

    .google-btn:hover {
      border-color: #ea4335;
      color: #ea4335;
    }

    .facebook-btn:hover {
      border-color: #1877f2;
      color: #1877f2;
    }

    .auth-switch {
      text-align: center;
      margin-top: 2rem;
    }

    .auth-switch p {
      color: #6b7280;
      margin: 0;
    }

    .switch-btn {
      background: none;
      border: none;
      color: #667eea;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .switch-btn:hover {
      color: #764ba2;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .auth-card {
        padding: 2rem;
        margin: 1rem;
      }
      
      .auth-header h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class AuthComponent {
  isLoginMode = true;
  showPassword = false;
  rememberMe = false;
  isSubmitting = false;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private notificationService: NotificationService) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.resetForm();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.isSubmitting) return;

    if (!this.isLoginMode && this.formData.password !== this.formData.confirmPassword) {
      this.notificationService.error('Passwords do not match');
      return;
    }

    this.isSubmitting = true;

    // Simulate authentication
    setTimeout(() => {
      if (this.isLoginMode) {
        this.notificationService.success('Welcome back! You have been signed in successfully.');
      } else {
        this.notificationService.success('Account created successfully! Welcome to ShopEasy.');
      }
      this.resetForm();
      this.isSubmitting = false;
    }, 2000);
  }

  private resetForm(): void {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.showPassword = false;
    this.rememberMe = false;
  }
}