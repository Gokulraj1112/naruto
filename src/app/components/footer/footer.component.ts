import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>ShopEasy</h3>
            <p>Your ultimate destination for exclusive Leaf Village merchandise and anime collectibles.</p>
            <div class="social-links">
              <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
              <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/products">Products</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a routerLink="/orders">Track Orders</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Contact Info</h4>
            <div class="contact-info">
              <p><i class="fas fa-map-marker-alt"></i> 123 Leaf Village Street, Konoha City</p>
              <p><i class="fas fa-phone"></i> +1 234 567 890</p>
              <p><i class="fas fa-envelope"></i> info@shopeasy.com</p>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 ShopEasy. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem 0 1rem;
      margin-top: 4rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    .footer-section h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #e5e7eb;
    }

    .footer-section p {
      line-height: 1.6;
      color: #d1d5db;
      margin-bottom: 1rem;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.5rem;
    }

    .footer-section ul li a {
      color: #d1d5db;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-section ul li a:hover {
      color: #fff;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .contact-info p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .contact-info i {
      width: 16px;
      color: #e5e7eb;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .footer-links {
      display: flex;
      gap: 1rem;
    }

    .footer-links a {
      color: #d1d5db;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #fff;
    }

    @media (max-width: 768px) {
      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
      
      .footer-links {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {}