import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-card card">
      <div class="product-image">
        <img [src]="product.image" [alt]="product.name" loading="lazy">
        <div class="product-overlay">
          <button class="overlay-btn" (click)="toggleWishlist()" [class.active]="isInWishlist">
            <i class="fas fa-heart"></i>
          </button>
          <a [routerLink]="['/product', product.id]" class="overlay-btn">
            <i class="fas fa-eye"></i>
          </a>
        </div>
        <div class="product-badges">
          <span class="badge discount" *ngIf="product.discount">-{{product.discount}}%</span>
          <span class="badge new" *ngIf="product.reviews < 50">New</span>
        </div>
      </div>
      
      <div class="product-info">
        <div class="product-category">{{product.category}}</div>
        <h3 class="product-name">
          <a [routerLink]="['/product', product.id]">{{product.name}}</a>
          <span class="japanese-name">{{product.nameJapanese}}</span>
        </h3>
        
        <div class="product-rating">
          <div class="stars">
            <i class="fas fa-star" *ngFor="let star of getStars()"></i>
            <i class="far fa-star" *ngFor="let star of getEmptyStars()"></i>
          </div>
          <span class="rating-text">({{product.reviews}})</span>
        </div>
        
        <div class="product-price">
          <span class="current-price">${{product.price}}</span>
          <span class="original-price" *ngIf="product.originalPrice">${{product.originalPrice}}</span>
        </div>
        
        <div class="product-actions">
          <button class="btn btn-primary" (click)="addToCart()" [disabled]="!product.inStock">
            <i class="fas fa-shopping-cart"></i>
            {{product.inStock ? 'Add to Cart' : 'Out of Stock'}}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .product-image {
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image img {
      transform: scale(1.1);
    }

    .product-overlay {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      opacity: 0;
      transform: translateX(20px);
      transition: all 0.3s ease;
    }

    .product-card:hover .product-overlay {
      opacity: 1;
      transform: translateX(0);
    }

    .overlay-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      color: #374151;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .overlay-btn:hover,
    .overlay-btn.active {
      background: #667eea;
      color: white;
      transform: scale(1.1);
    }

    .product-badges {
      position: absolute;
      top: 1rem;
      left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .badge.discount {
      background: #ef4444;
      color: white;
    }

    .badge.new {
      background: #10b981;
      color: white;
    }

    .product-info {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .product-category {
      font-size: 0.875rem;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .product-name {
      margin-bottom: 1rem;
      flex: 1;
    }

    .product-name a {
      font-size: 1.1rem;
      font-weight: 600;
      color: #374151;
      text-decoration: none;
      transition: color 0.3s ease;
      display: block;
      margin-bottom: 0.25rem;
    }

    .product-name a:hover {
      color: #667eea;
    }

    .japanese-name {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 400;
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .stars {
      color: #fbbf24;
    }

    .rating-text {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .product-price {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .current-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: #667eea;
    }

    .original-price {
      font-size: 1rem;
      color: #9ca3af;
      text-decoration: line-through;
    }

    .product-actions {
      margin-top: auto;
    }

    .btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      font-weight: 600;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private notificationService: NotificationService
  ) {}

  get isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.product.id);
  }

  getStars(): number[] {
    return Array(Math.floor(this.product.rating)).fill(0);
  }

  getEmptyStars(): number[] {
    return Array(5 - Math.floor(this.product.rating)).fill(0);
  }

  addToCart(): void {
    if (this.product.inStock) {
      this.cartService.addToCart(this.product);
      this.notificationService.success(`${this.product.name} added to cart!`);
    }
  }

  toggleWishlist(): void {
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
      this.notificationService.info(`${this.product.name} removed from wishlist`);
    } else {
      this.wishlistService.addToWishlist(this.product);
      this.notificationService.success(`${this.product.name} added to wishlist!`);
    }
  }
}