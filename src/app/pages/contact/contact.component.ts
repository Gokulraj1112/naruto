import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  template: `
    <app-notification></app-notification>
    
    <div class="contact-page">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div class="contact-content">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <div class="form-card">
              <h2>Send us a Message</h2>
              <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName" class="form-label">First Name *</label>
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
                  
                  <div class="form-group">
                    <label for="lastName" class="form-label">Last Name *</label>
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
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email Address *</label>
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
                  <label for="phone" class="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    class="form-input"
                    [(ngModel)]="formData.phone"
                  >
                </div>

                <div class="form-group">
                  <label for="subject" class="form-label">Subject *</label>
                  <select 
                    id="subject"
                    name="subject"
                    class="form-input"
                    [(ngModel)]="formData.subject"
                    required
                    #subject="ngModel"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping & Returns</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                  <div class="error-message" *ngIf="subject.invalid && subject.touched">
                    Please select a subject
                  </div>
                </div>

                <div class="form-group">
                  <label for="message" class="form-label">Message *</label>
                  <textarea 
                    id="message"
                    name="message"
                    class="form-input"
                    rows="6"
                    [(ngModel)]="formData.message"
                    required
                    #message="ngModel"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  <div class="error-message" *ngIf="message.invalid && message.touched">
                    Message is required
                  </div>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary"
                  [disabled]="contactForm.invalid || isSubmitting"
                >
                  <i class="fas fa-paper-plane" *ngIf="!isSubmitting"></i>
                  <i class="fas fa-spinner fa-spin" *ngIf="isSubmitting"></i>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="contact-info-section">
            <div class="info-card">
              <h2>Get in Touch</h2>
              <p>Have questions? We're here to help! Reach out to us through any of the following channels.</p>
              
              <div class="contact-methods">
                <div class="contact-method">
                  <div class="method-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="method-info">
                    <h3>Visit Us</h3>
                    <p>123 Leaf Village Street<br>Konoha City, Fire Country 56789</p>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div class="method-info">
                    <h3>Call Us</h3>
                    <p>+1 234 567 890<br>Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="method-info">
                    <h3>Email Us</h3>
                    <p>info@shopeasy.com<br>support@shopeasy.com</p>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div class="method-info">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9AM - 6PM<br>Saturday: 10AM - 4PM<br>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="faq-card">
              <h3>Frequently Asked Questions</h3>
              <div class="faq-list">
                <div class="faq-item">
                  <h4>How long does shipping take?</h4>
                  <p>Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.</p>
                </div>
                <div class="faq-item">
                  <h4>What's your return policy?</h4>
                  <p>We offer a 30-day return policy for all items in original condition.</p>
                </div>
                <div class="faq-item">
                  <h4>Do you ship internationally?</h4>
                  <p>Yes, we ship to most countries worldwide. Shipping costs vary by location.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      padding: 2rem 0;
      min-height: 80vh;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 1rem;
    }

    .page-header p {
      font-size: 1.1rem;
      color: #6b7280;
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 3rem;
      align-items: start;
    }

    .form-card,
    .info-card,
    .faq-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .form-card h2,
    .info-card h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 1.5rem;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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
      padding: 0.75rem 1rem;
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

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    textarea.form-input {
      resize: vertical;
      min-height: 120px;
    }

    .btn {
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .info-card p {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-method {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .method-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .method-info h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .method-info p {
      color: #6b7280;
      line-height: 1.5;
      margin: 0;
    }

    .faq-card {
      margin-top: 2rem;
    }

    .faq-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 1rem;
    }

    .faq-list {
      
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .faq-item p {
      color: #6b7280;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
    }

    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .contact-info-section {
        order: -1;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;

  constructor(private notificationService: NotificationService) {}

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    // Simulate form submission
    setTimeout(() => {
      this.notificationService.success('Thank you for your message! We\'ll get back to you soon.');
      this.resetForm();
      this.isSubmitting = false;
    }, 2000);
  }

  private resetForm(): void {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}