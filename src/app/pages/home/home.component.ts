import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NotificationComponent } from '../../components/notification/notification.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, NotificationComponent],
  template: `
    <app-notification></app-notification>
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background"></div>
      <div class="container">
        <div class="hero-content fade-in">
          <h1>Welcome to ShopEasy</h1>
          <p class="hero-subtitle">Your one-stop destination for exclusive Leaf Village merchandise!</p>
          <p class="hero-description">
            Discover high-quality collectibles, action figures, and more, inspired by your favorite anime characters. 
            Perfect for fans and collectors alike.
          </p>
          <div class="hero-actions">
            <a routerLink="/products" class="btn btn-primary">Shop Now</a>
            <a routerLink="/about" class="btn btn-outline">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="features-grid">
          <div class="feature-card slide-up">
            <div class="feature-icon">
              <i class="fas fa-shipping-fast"></i>
            </div>
            <h3>Free Shipping</h3>
            <p>Free shipping on orders over $50</p>
          </div>
          <div class="feature-card slide-up">
            <div class="feature-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>Secure Payment</h3>
            <p>100% secure payment processing</p>
          </div>
          <div class="feature-card slide-up">
            <div class="feature-icon">
              <i class="fas fa-undo"></i>
            </div>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div class="feature-card slide-up">
            <div class="feature-icon">
              <i class="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <div class="container">
        <div class="section-header">
          <h2>Featured Products</h2>
          <p>Discover our most popular anime collectibles</p>
        </div>
        
        <div class="products-grid" *ngIf="featuredProducts$ | async as products">
          <app-product-card 
            *ngFor="let product of products.slice(0, 6)" 
            [product]="product"
            class="slide-up">
          </app-product-card>
        </div>
        
        <div class="section-footer">
          <a routerLink="/products" class="btn btn-secondary">View All Products</a>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest products and exclusive offers</p>
          </div>
          <div class="newsletter-form">
            <input type="email" placeholder="Enter your email" class="form-input">
            <button class="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 80vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg') center/cover;
      opacity: 0.1;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #fff, #e5e7eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .hero-description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0.8;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .features {
      padding: 5rem 0;
      background: white;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      text-align: center;
      padding: 2rem;
      border-radius: 12px;
      background: white;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #374151;
    }

    .feature-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    .featured-products {
      padding: 5rem 0;
      background: #f9fafb;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 1rem;
    }

    .section-header p {
      font-size: 1.1rem;
      color: #6b7280;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .section-footer {
      text-align: center;
    }

    .newsletter {
      padding: 4rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .newsletter-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .newsletter-text h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .newsletter-form {
      display: flex;
      gap: 1rem;
      flex: 1;
      max-width: 400px;
    }

    .newsletter-form .form-input {
      flex: 1;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      backdrop-filter: blur(10px);
    }

    .newsletter-form .form-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }
      
      .hero-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .newsletter-content {
        flex-direction: column;
        text-align: center;
      }
      
      .newsletter-form {
        width: 100%;
        max-width: none;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.featuredProducts$ = this.productService.getFeaturedProducts();
  }
}